using Microsoft.EntityFrameworkCore;
using MortgageCrm.Api.Data;
using MortgageCrm.Api.Dtos;
using MortgageCrm.Api.Entities;

namespace MortgageCrm.Api.Endpoints;

public static class LeadEndpoints
{
    public static void MapLeadEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/leads").WithTags("Leads");

        group.MapGet("/", GetAll);
        group.MapGet("/{id:guid}", GetById);
        group.MapPost("/", Create);
        group.MapPut("/{id:guid}", Update);
        group.MapPatch("/{id:guid}/status", UpdateStatus);
        group.MapDelete("/{id:guid}", Delete);
    }

    private static async Task<IResult> GetAll(
        AppDbContext db,
        LeadStatus? status = null,
        Guid? partnerId = null,
        string? search = null)
    {
        var query = db.Leads
            .Include(l => l.Partner)
            .AsQueryable();

        if (status.HasValue)
            query = query.Where(l => l.Status == status.Value);

        if (partnerId.HasValue)
            query = query.Where(l => l.PartnerId == partnerId.Value);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.ToLower();
            query = query.Where(l =>
                l.FirstName.ToLower().Contains(term) ||
                l.LastName.ToLower().Contains(term) ||
                (l.Email != null && l.Email.ToLower().Contains(term)));
        }

        var leads = await query
            .OrderByDescending(l => l.UpdatedAt)
            .ToListAsync();

        return Results.Ok(leads.Select(l => l.ToDto()));
    }

    private static async Task<IResult> GetById(Guid id, AppDbContext db)
    {
        var lead = await db.Leads
            .Include(l => l.Partner)
            .FirstOrDefaultAsync(l => l.Id == id);

        if (lead is null)
            return Results.NotFound();

        return Results.Ok(lead.ToDto());
    }

    private static async Task<IResult> Create(CreateLeadRequest request, AppDbContext db)
    {
        if (request.PartnerId.HasValue)
        {
            var partnerExists = await db.Partners.AnyAsync(p => p.Id == request.PartnerId.Value);
            if (!partnerExists)
                return Results.BadRequest("Partner not found");
        }

        var lead = new Lead
        {
            Id = Guid.NewGuid(),
            PartnerId = request.PartnerId,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Phone = request.Phone,
            LoanType = request.LoanType,
            LoanAmount = request.LoanAmount,
            PropertyAddress = request.PropertyAddress,
            Status = LeadStatus.New,
            Notes = request.Notes
        };

        db.Leads.Add(lead);
        await db.SaveChangesAsync();

        // Reload with partner
        await db.Entry(lead).Reference(l => l.Partner).LoadAsync();

        return Results.Created($"/api/leads/{lead.Id}", lead.ToDto());
    }

    private static async Task<IResult> Update(Guid id, UpdateLeadRequest request, AppDbContext db)
    {
        var lead = await db.Leads
            .Include(l => l.Partner)
            .FirstOrDefaultAsync(l => l.Id == id);

        if (lead is null)
            return Results.NotFound();

        if (request.PartnerId.HasValue && request.PartnerId != lead.PartnerId)
        {
            var partnerExists = await db.Partners.AnyAsync(p => p.Id == request.PartnerId.Value);
            if (!partnerExists)
                return Results.BadRequest("Partner not found");
        }

        lead.PartnerId = request.PartnerId;
        lead.FirstName = request.FirstName;
        lead.LastName = request.LastName;
        lead.Email = request.Email;
        lead.Phone = request.Phone;
        lead.LoanType = request.LoanType;
        lead.LoanAmount = request.LoanAmount;
        lead.PropertyAddress = request.PropertyAddress;
        lead.Notes = request.Notes;

        await db.SaveChangesAsync();

        // Reload partner if changed
        await db.Entry(lead).Reference(l => l.Partner).LoadAsync();

        return Results.Ok(lead.ToDto());
    }

    private static async Task<IResult> UpdateStatus(Guid id, UpdateLeadStatusRequest request, AppDbContext db)
    {
        var lead = await db.Leads
            .Include(l => l.Partner)
            .FirstOrDefaultAsync(l => l.Id == id);

        if (lead is null)
            return Results.NotFound();

        var oldStatus = lead.Status;
        lead.Status = request.Status;

        // Log status change as activity
        var activity = new Activity
        {
            Id = Guid.NewGuid(),
            LeadId = lead.Id,
            Type = ActivityType.StatusChange,
            Description = $"Status changed from {oldStatus} to {request.Status}"
        };

        db.Activities.Add(activity);
        await db.SaveChangesAsync();

        return Results.Ok(lead.ToDto());
    }

    private static async Task<IResult> Delete(Guid id, AppDbContext db)
    {
        var lead = await db.Leads.FindAsync(id);
        if (lead is null)
            return Results.NotFound();

        db.Leads.Remove(lead);
        await db.SaveChangesAsync();

        return Results.NoContent();
    }
}
