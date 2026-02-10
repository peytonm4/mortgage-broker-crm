using MortgageCrm.Api.Entities;

namespace MortgageCrm.Api.Dtos;

// Request DTOs
public record UpdateApplicationStatusRequest(
    ApplicationStatus Status
);

public record CreateDocRequestRequest(
    DocumentCategory Category,
    ResponsibleParty ResponsibleParty,
    string? Message
);

public record UpdateDocRequestStatusRequest(
    DocRequestStatus Status
);

// Response DTOs
public record PipelineApplicationDto(
    Guid Id,
    string BorrowerName,
    string BorrowerEmail,
    string Status,
    string LoanType,
    decimal LoanAmount,
    string? PropertyCity,
    string? PropertyState,
    DateTime? SubmittedAt,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

public record PipelineDetailDto(
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
    DateTime UpdatedAt,
    int DocRequestCount,
    int PendingDocRequestCount
);

public record DocRequestDetailDto(
    Guid Id,
    string Category,
    string ResponsibleParty,
    string Status,
    string? Message,
    Guid RequestedByUserId,
    string? RequestedByEmail,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

// Extension methods
public static class PipelineExtensions
{
    public static PipelineApplicationDto ToPipelineDto(this LoanApplication app)
    {
        return new PipelineApplicationDto(
            app.Id,
            app.Borrower?.FullName ?? "Unknown",
            app.Borrower?.Email ?? "",
            app.Status.ToString(),
            app.LoanType.ToString(),
            app.LoanAmount,
            app.PropertyCity,
            app.PropertyState,
            app.SubmittedAt,
            app.CreatedAt,
            app.UpdatedAt
        );
    }

    public static PipelineDetailDto ToPipelineDetailDto(
        this LoanApplication app,
        int docRequestCount,
        int pendingDocRequestCount)
    {
        return new PipelineDetailDto(
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
            app.UpdatedAt,
            docRequestCount,
            pendingDocRequestCount
        );
    }

    public static DocRequestDetailDto ToDetailDto(this DocRequest doc)
    {
        return new DocRequestDetailDto(
            doc.Id,
            doc.Category.ToString(),
            doc.ResponsibleParty.ToString(),
            doc.Status.ToString(),
            doc.Message,
            doc.RequestedByUserId,
            doc.RequestedBy?.Email,
            doc.CreatedAt,
            doc.UpdatedAt
        );
    }
}
