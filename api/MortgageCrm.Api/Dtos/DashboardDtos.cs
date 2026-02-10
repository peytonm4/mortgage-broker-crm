namespace MortgageCrm.Api.Dtos;

public record DashboardStatsDto(
    int TotalLeads,
    int NewLeads,
    int InProgressLeads,
    int FundedThisMonth,
    int ActivePartners,
    decimal TotalPipelineValue,
    IEnumerable<StatusCountDto> LeadsByStatus,
    IEnumerable<PartnerLeaderboardDto> TopPartners
);

public record StatusCountDto(
    string Status,
    int Count
);

public record PartnerLeaderboardDto(
    Guid Id,
    string Name,
    int TotalReferrals,
    int FundedCount
);
