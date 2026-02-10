namespace MortgageCrm.Api.Entities;

public class LoanApplication
{
    public Guid Id { get; set; }
    public Guid BorrowerId { get; set; }
    public ApplicationStatus Status { get; set; }
    public ApplicationLoanType LoanType { get; set; }
    public decimal LoanAmount { get; set; }
    public string? PropertyStreetAddress { get; set; }
    public string? PropertyCity { get; set; }
    public string? PropertyState { get; set; }
    public string? PropertyZipCode { get; set; }
    public string? PropertyType { get; set; }
    public int CurrentStep { get; set; }
    public DateTime? SubmittedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation
    public Borrower? Borrower { get; set; }
    public ICollection<DocRequest> DocRequests { get; set; } = [];
}

public enum ApplicationStatus
{
    Draft,
    Received,
    InReview,
    NeedsDocs,
    Submitted,
    Closed,
    Denied
}

public enum ApplicationLoanType
{
    Purchase,
    Refinance,
    HELOC,
    FHA,
    VA,
    Conventional
}
