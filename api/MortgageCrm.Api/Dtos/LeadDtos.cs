using MortgageCrm.Api.Entities;

namespace MortgageCrm.Api.Dtos;

public record LeadDto(
    Guid Id,
    Guid? PartnerId,
    string? PartnerName,
    string FirstName,
    string LastName,
    string FullName,
    string? Email,
    string? Phone,
    string LoanType,
    decimal? LoanAmount,
    string? PropertyAddress,
    string Status,
    string? Notes,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

public record CreateLeadRequest(
    Guid? PartnerId,
    string FirstName,
    string LastName,
    string? Email,
    string? Phone,
    LoanType LoanType,
    decimal? LoanAmount,
    string? PropertyAddress,
    string? Notes
);

public record UpdateLeadRequest(
    Guid? PartnerId,
    string FirstName,
    string LastName,
    string? Email,
    string? Phone,
    LoanType LoanType,
    decimal? LoanAmount,
    string? PropertyAddress,
    string? Notes
);

public record UpdateLeadStatusRequest(
    LeadStatus Status
);

public static class LeadExtensions
{
    public static LeadDto ToDto(this Lead lead)
    {
        return new LeadDto(
            lead.Id,
            lead.PartnerId,
            lead.Partner?.Name,
            lead.FirstName,
            lead.LastName,
            lead.FullName,
            lead.Email,
            lead.Phone,
            lead.LoanType.ToString(),
            lead.LoanAmount,
            lead.PropertyAddress,
            lead.Status.ToString(),
            lead.Notes,
            lead.CreatedAt,
            lead.UpdatedAt
        );
    }
}
