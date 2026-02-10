namespace MortgageCrm.Api.Entities;

public class DocRequest
{
    public Guid Id { get; set; }
    public Guid ApplicationId { get; set; }
    public DocumentCategory Category { get; set; }
    public ResponsibleParty ResponsibleParty { get; set; }
    public Guid RequestedByUserId { get; set; }
    public DocRequestStatus Status { get; set; }
    public string? Message { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation
    public LoanApplication? Application { get; set; }
    public User? RequestedBy { get; set; }
}

public enum DocumentCategory
{
    PayStubs,
    W2s,
    BankStatements,
    TaxReturns,
    DriversLicense,
    Other
}

public enum DocRequestStatus
{
    Pending,
    Fulfilled,
    Cancelled
}

public enum ResponsibleParty
{
    Borrower,
    Broker,
    TitleCompany,
    Appraiser
}
