using Microsoft.EntityFrameworkCore;
using MortgageCrm.Api.Data;
using MortgageCrm.Api.Dtos;
using MortgageCrm.Api.Entities;

namespace MortgageCrm.Api.Endpoints;

public static class PartnerEndpoints
{
    public static void MapPartnerEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/partners").WithTags("Partners");

        group.MapGet("/", GetAll);
        group.MapGet("/{id:guid}", GetById);
        group.MapPost("/", Create);
        group.MapPut("/{id:guid}", Update);
        group.MapDelete("/{id:guid}", Delete);
    }

    private static async Task<IResult> GetAll(
        AppDbContext db,
        string? search = null)
    {
        var query = db.Partners.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.ToLower();
            query = query.Where(p =>
                p.Name.ToLower().Contains(term) ||
                (p.Company != null && p.Company.ToLower().Contains(term)) ||
                (p.Email != null && p.Email.ToLower().Contains(term)));
        }

        var partners = await query
            .OrderByDescending(p => p.LastContactedAt)
            .ThenBy(p => p.Name)
            .ToListAsync();

        return Results.Ok(partners.Select(p => p.ToDto()));
    }

    private static async Task<IResult> GetById(Guid id, AppDbContext db)
    {
        var partner = await db.Partners.FindAsync(id);
        if (partner is null)
            return Results.NotFound();

        var totalLeads = await db.Leads.CountAsync(l => l.PartnerId == id);
        var fundedLeads = await db.Leads.CountAsync(l => l.PartnerId == id && l.Status == LeadStatus.Funded);

        return Results.Ok(partner.ToDetailDto(totalLeads, fundedLeads));
    }

    private static async Task<IResult> Create(CreatePartnerRequest request, AppDbContext db)
    {
        var partner = new Partner
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Company = request.Company,
            Type = request.Type,
            Email = request.Email,
            Phone = request.Phone,
            Notes = request.Notes
        };

        db.Partners.Add(partner);
        await db.SaveChangesAsync();

        return Results.Created($"/api/partners/{partner.Id}", partner.ToDto());
    }

    private static async Task<IResult> Update(Guid id, UpdatePartnerRequest request, AppDbContext db)
    {
        var partner = await db.Partners.FindAsync(id);
        if (partner is null)
            return Results.NotFound();

        partner.Name = request.Name;
        partner.Company = request.Company;
        partner.Type = request.Type;
        partner.Email = request.Email;
        partner.Phone = request.Phone;
        partner.Notes = request.Notes;

        await db.SaveChangesAsync();

        return Results.Ok(partner.ToDto());
    }

    private static async Task<IResult> Delete(Guid id, AppDbContext db)
    {
        var partner = await db.Partners.FindAsync(id);
        if (partner is null)
            return Results.NotFound();

        db.Partners.Remove(partner);
        await db.SaveChangesAsync();

        return Results.NoContent();
    }
}
