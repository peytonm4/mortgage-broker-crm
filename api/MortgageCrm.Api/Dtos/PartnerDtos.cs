using MortgageCrm.Api.Entities;

namespace MortgageCrm.Api.Dtos;

public record PartnerDto(
    Guid Id,
    string Name,
    string? Company,
    string Type,
    string? Email,
    string? Phone,
    DateTime? LastContactedAt,
    int? DaysSinceContact,
    string? Notes,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

public record PartnerDetailDto(
    Guid Id,
    string Name,
    string? Company,
    string Type,
    string? Email,
    string? Phone,
    DateTime? LastContactedAt,
    int? DaysSinceContact,
    string? Notes,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    int TotalLeads,
    int FundedLeads,
    decimal ConversionRate
);

public record CreatePartnerRequest(
    string Name,
    string? Company,
    PartnerType Type,
    string? Email,
    string? Phone,
    string? Notes
);

public record UpdatePartnerRequest(
    string Name,
    string? Company,
    PartnerType Type,
    string? Email,
    string? Phone,
    string? Notes
);

public static class PartnerExtensions
{
    public static PartnerDto ToDto(this Partner partner)
    {
        var daysSinceContact = partner.LastContactedAt.HasValue
            ? (int?)(DateTime.UtcNow - partner.LastContactedAt.Value).Days
            : null;

        return new PartnerDto(
            partner.Id,
            partner.Name,
            partner.Company,
            partner.Type.ToString(),
            partner.Email,
            partner.Phone,
            partner.LastContactedAt,
            daysSinceContact,
            partner.Notes,
            partner.CreatedAt,
            partner.UpdatedAt
        );
    }

    public static PartnerDetailDto ToDetailDto(this Partner partner, int totalLeads, int fundedLeads)
    {
        var daysSinceContact = partner.LastContactedAt.HasValue
            ? (int?)(DateTime.UtcNow - partner.LastContactedAt.Value).Days
            : null;

        var conversionRate = totalLeads > 0 ? (decimal)fundedLeads / totalLeads * 100 : 0;

        return new PartnerDetailDto(
            partner.Id,
            partner.Name,
            partner.Company,
            partner.Type.ToString(),
            partner.Email,
            partner.Phone,
            partner.LastContactedAt,
            daysSinceContact,
            partner.Notes,
            partner.CreatedAt,
            partner.UpdatedAt,
            totalLeads,
            fundedLeads,
            Math.Round(conversionRate, 1)
        );
    }
}
