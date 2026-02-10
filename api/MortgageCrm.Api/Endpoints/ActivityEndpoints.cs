using Microsoft.EntityFrameworkCore;
using MortgageCrm.Api.Data;
using MortgageCrm.Api.Dtos;
using MortgageCrm.Api.Entities;

namespace MortgageCrm.Api.Endpoints;

public static class ActivityEndpoints
{
    public static void MapActivityEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/activities").WithTags("Activities");

        group.MapGet("/", GetAll);
        group.MapPost("/", Create);
    }

    private static async Task<IResult> GetAll(
        AppDbContext db,
        Guid? partnerId = null,
        Guid? leadId = null)
    {
        var query = db.Activities
            .Include(a => a.Partner)
            .Include(a => a.Lead)
            .AsQueryable();

        if (partnerId.HasValue)
            query = query.Where(a => a.PartnerId == partnerId.Value);

        if (leadId.HasValue)
            query = query.Where(a => a.LeadId == leadId.Value);

        var activities = await query
            .OrderByDescending(a => a.CreatedAt)
            .Take(100)
            .ToListAsync();

        return Results.Ok(activities.Select(a => a.ToDto()));
    }

    private static async Task<IResult> Create(CreateActivityRequest request, AppDbContext db)
    {
        if (!request.PartnerId.HasValue && !request.LeadId.HasValue)
            return Results.BadRequest("Either PartnerId or LeadId is required");

        if (request.PartnerId.HasValue)
        {
            var partner = await db.Partners.FindAsync(request.PartnerId.Value);
            if (partner is null)
                return Results.BadRequest("Partner not found");

            // Update partner's last contacted date for contact-type activities
            if (request.Type is ActivityType.Call or ActivityType.Email or ActivityType.Meeting)
            {
                partner.LastContactedAt = DateTime.UtcNow;
            }
        }

        if (request.LeadId.HasValue)
        {
            var leadExists = await db.Leads.AnyAsync(l => l.Id == request.LeadId.Value);
            if (!leadExists)
                return Results.BadRequest("Lead not found");
        }

        var activity = new Activity
        {
            Id = Guid.NewGuid(),
            PartnerId = request.PartnerId,
            LeadId = request.LeadId,
            Type = request.Type,
            Description = request.Description
        };

        db.Activities.Add(activity);
        await db.SaveChangesAsync();

        // Reload with navigation properties
        await db.Entry(activity).Reference(a => a.Partner).LoadAsync();
        await db.Entry(activity).Reference(a => a.Lead).LoadAsync();

        return Results.Created($"/api/activities/{activity.Id}", activity.ToDto());
    }
}
