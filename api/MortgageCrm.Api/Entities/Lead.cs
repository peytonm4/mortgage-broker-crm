namespace MortgageCrm.Api.Entities;

public class Lead
{
    public Guid Id { get; set; }
    public Guid? PartnerId { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public LoanType LoanType { get; set; }
    public decimal? LoanAmount { get; set; }
    public string? PropertyAddress { get; set; }
    public LeadStatus Status { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation
    public Partner? Partner { get; set; }
    public ICollection<Activity> Activities { get; set; } = [];

    public string FullName => $"{FirstName} {LastName}";
}

public enum LoanType
{
    Purchase,
    Refinance,
    HELOC
}

public enum LeadStatus
{
    New,
    Contacted,
    InProgress,
    Funded,
    Lost
}
