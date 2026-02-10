using MortgageCrm.Api.Entities;

namespace MortgageCrm.Api.Dtos;

public record ActivityDto(
    Guid Id,
    Guid? PartnerId,
    string? PartnerName,
    Guid? LeadId,
    string? LeadName,
    string Type,
    string Description,
    DateTime CreatedAt
);

public record CreateActivityRequest(
    Guid? PartnerId,
    Guid? LeadId,
    ActivityType Type,
    string Description
);

public static class ActivityExtensions
{
    public static ActivityDto ToDto(this Activity activity)
    {
        return new ActivityDto(
            activity.Id,
            activity.PartnerId,
            activity.Partner?.Name,
            activity.LeadId,
            activity.Lead != null ? $"{activity.Lead.FirstName} {activity.Lead.LastName}" : null,
            activity.Type.ToString(),
            activity.Description,
            activity.CreatedAt
        );
    }
}
