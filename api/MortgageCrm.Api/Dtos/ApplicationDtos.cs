using MortgageCrm.Api.Entities;

namespace MortgageCrm.Api.Dtos;

// Request DTOs
public record StartApplicationRequest(
    string FirstName,
    string LastName,
    string Email,
    string? Phone
);

public record UpdatePersonalInfoRequest(
    string FirstName,
    string LastName,
    string Email,
    string? Phone,
    string? SsnLast4,
    string? StreetAddress,
    string? City,
    string? State,
    string? ZipCode
);

public record UpdateLoanDetailsRequest(
    ApplicationLoanType LoanType,
    decimal LoanAmount,
    string? PropertyStreetAddress,
    string? PropertyCity,
    string? PropertyState,
    string? PropertyZipCode,
    string? PropertyType
);

// Response DTOs
public record ApplicationDto(
    Guid Id,
    Guid BorrowerId,
    BorrowerSummaryDto Borrower,
    string Status,
    string LoanType,
    decimal LoanAmount,
    string? PropertyStreetAddress,
    string? PropertyCity,
    string? PropertyState,
    string? PropertyZipCode,
    string? PropertyType,
    int CurrentStep,
    DateTime? SubmittedAt,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

public record BorrowerSummaryDto(
    Guid Id,
    string FirstName,
    string LastName,
    string FullName,
    string Email,
    string? Phone,
    string? SsnLast4,
    string? StreetAddress,
    string? City,
    string? State,
    string? ZipCode
);

public record DocRequestDto(
    Guid Id,
    string Category,
    string ResponsibleParty,
    string Status,
    string? Message,
    DateTime CreatedAt
);

public record StartApplicationResponse(
    Guid ApplicationId,
    Guid BorrowerId,
    Guid UserId
);

// Extension methods
public static class ApplicationExtensions
{
    public static ApplicationDto ToDto(this LoanApplication app)
    {
        return new ApplicationDto(
            app.Id,
            app.BorrowerId,
            app.Borrower!.ToSummaryDto(),
            app.Status.ToString(),
            app.LoanType.ToString(),
            app.LoanAmount,
            app.PropertyStreetAddress,
            app.PropertyCity,
            app.PropertyState,
            app.PropertyZipCode,
            app.PropertyType,
            app.CurrentStep,
            app.SubmittedAt,
            app.CreatedAt,
            app.UpdatedAt
        );
    }

    public static BorrowerSummaryDto ToSummaryDto(this Borrower borrower)
    {
        return new BorrowerSummaryDto(
            borrower.Id,
            borrower.FirstName,
            borrower.LastName,
            borrower.FullName,
            borrower.Email,
            borrower.Phone,
            borrower.SsnLast4,
            borrower.StreetAddress,
            borrower.City,
            borrower.State,
            borrower.ZipCode
        );
    }

    public static DocRequestDto ToDto(this DocRequest doc)
    {
        return new DocRequestDto(
            doc.Id,
            doc.Category.ToString(),
            doc.ResponsibleParty.ToString(),
            doc.Status.ToString(),
            doc.Message,
            doc.CreatedAt
        );
    }
}
