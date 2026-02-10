namespace MortgageCrm.Api.Entities;

public class Activity
{
    public Guid Id { get; set; }
    public Guid? PartnerId { get; set; }
    public Guid? LeadId { get; set; }
    public ActivityType Type { get; set; }
    public required string Description { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation
    public Partner? Partner { get; set; }
    public Lead? Lead { get; set; }
}

public enum ActivityType
{
    Call,
    Email,
    Meeting,
    Note,
    StatusChange
}
