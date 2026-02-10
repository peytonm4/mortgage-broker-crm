namespace MortgageCrm.Api.Entities;

public class Partner
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public string? Company { get; set; }
    public PartnerType Type { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public DateTime? LastContactedAt { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation
    public ICollection<Lead> Leads { get; set; } = [];
    public ICollection<Activity> Activities { get; set; } = [];
}

public enum PartnerType
{
    Realtor,
    CPA,
    Attorney,
    PastClient,
    Other
}
