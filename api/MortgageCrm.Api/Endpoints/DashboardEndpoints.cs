using Microsoft.EntityFrameworkCore;
using MortgageCrm.Api.Data;
using MortgageCrm.Api.Dtos;
using MortgageCrm.Api.Entities;

namespace MortgageCrm.Api.Endpoints;

public static class DashboardEndpoints
{
    public static void MapDashboardEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/dashboard").WithTags("Dashboard");

        group.MapGet("/stats", GetStats);
    }

    private static async Task<IResult> GetStats(AppDbContext db)
    {
        var now = DateTime.UtcNow;
        var startOfMonth = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);

        // Basic counts
        var totalLeads = await db.Leads.CountAsync();
        var newLeads = await db.Leads.CountAsync(l => l.Status == LeadStatus.New);
        var inProgressLeads = await db.Leads.CountAsync(l => l.Status == LeadStatus.InProgress);
        var fundedThisMonth = await db.Leads.CountAsync(l =>
            l.Status == LeadStatus.Funded && l.UpdatedAt >= startOfMonth);

        // Active partners (contacted in last 30 days)
        var thirtyDaysAgo = now.AddDays(-30);
        var activePartners = await db.Partners.CountAsync(p =>
            p.LastContactedAt.HasValue && p.LastContactedAt.Value >= thirtyDaysAgo);

        // Pipeline value (sum of loan amounts for non-closed leads)
        var totalPipelineValue = await db.Leads
            .Where(l => l.Status != LeadStatus.Funded && l.Status != LeadStatus.Lost)
            .SumAsync(l => l.LoanAmount ?? 0);

        // Leads by status
        var leadsByStatus = await db.Leads
            .GroupBy(l => l.Status)
            .Select(g => new StatusCountDto(g.Key.ToString(), g.Count()))
            .ToListAsync();

        // Top partners by referrals
        var topPartners = await db.Partners
            .Select(p => new
            {
                p.Id,
                p.Name,
                TotalReferrals = p.Leads.Count,
                FundedCount = p.Leads.Count(l => l.Status == LeadStatus.Funded)
            })
            .Where(p => p.TotalReferrals > 0)
            .OrderByDescending(p => p.TotalReferrals)
            .Take(5)
            .Select(p => new PartnerLeaderboardDto(p.Id, p.Name, p.TotalReferrals, p.FundedCount))
            .ToListAsync();

        var stats = new DashboardStatsDto(
            totalLeads,
            newLeads,
            inProgressLeads,
            fundedThisMonth,
            activePartners,
            totalPipelineValue,
            leadsByStatus,
            topPartners
        );

        return Results.Ok(stats);
    }
}
