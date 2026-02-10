using Microsoft.EntityFrameworkCore;
using MortgageCrm.Api.Data;
using MortgageCrm.Api.Dtos;
using MortgageCrm.Api.Entities;

namespace MortgageCrm.Api.Endpoints;

public static class PipelineEndpoints
{
    public static void MapPipelineEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/pipeline").WithTags("Pipeline");

        group.MapGet("/", GetAll);
        group.MapGet("/{id:guid}", GetById);
        group.MapPatch("/{id:guid}/status", UpdateStatus);
        group.MapPost("/{id:guid}/doc-requests", CreateDocRequest);
        group.MapGet("/{id:guid}/doc-requests", GetDocRequests);

        // Doc request management
        var docGroup = app.MapGroup("/api/doc-requests").WithTags("DocRequests");
        docGroup.MapPatch("/{id:guid}/status", UpdateDocRequestStatus);
    }

    private static async Task<IResult> GetAll(
        AppDbContext db,
        ApplicationStatus? status = null,
        string? search = null)
    {
        var query = db.LoanApplications
            .Include(a => a.Borrower)
            .Where(a => a.Status != ApplicationStatus.Draft)
            .AsQueryable();

        if (status.HasValue)
            query = query.Where(a => a.Status == status.Value);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.ToLower();
            query = query.Where(a =>
                a.Borrower!.FirstName.ToLower().Contains(term) ||
                a.Borrower!.LastName.ToLower().Contains(term) ||
                a.Borrower!.Email.ToLower().Contains(term));
        }

        var applications = await query
            .OrderByDescending(a => a.SubmittedAt ?? a.CreatedAt)
            .ToListAsync();

        return Results.Ok(applications.Select(a => a.ToPipelineDto()));
    }

    private static async Task<IResult> GetById(Guid id, AppDbContext db)
    {
        var application = await db.LoanApplications
            .Include(a => a.Borrower)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (application is null)
            return Results.NotFound();

        var docRequestCount = await db.DocRequests.CountAsync(d => d.ApplicationId == id);
        var pendingDocRequestCount = await db.DocRequests.CountAsync(d => d.ApplicationId == id && d.Status == DocRequestStatus.Pending);

        return Results.Ok(application.ToPipelineDetailDto(
            docRequestCount,
            pendingDocRequestCount
        ));
    }

    private static async Task<IResult> UpdateStatus(
        Guid id,
        UpdateApplicationStatusRequest request,
        AppDbContext db)
    {
        var application = await db.LoanApplications
            .Include(a => a.Borrower)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (application is null)
            return Results.NotFound();

        application.Status = request.Status;
        await db.SaveChangesAsync();

        return Results.Ok(application.ToPipelineDto());
    }

    private static async Task<IResult> CreateDocRequest(
        Guid id,
        CreateDocRequestRequest request,
        AppDbContext db)
    {
        var application = await db.LoanApplications.FindAsync(id);
        if (application is null)
            return Results.NotFound();

        // Get first staff user as requester (in production, would use authenticated user)
        var staffUser = await db.Users.FirstOrDefaultAsync(u => u.Role == UserRole.Staff || u.Role == UserRole.Admin);
        if (staffUser is null)
            return Results.BadRequest("No staff user found");

        var docRequest = new DocRequest
        {
            Id = Guid.NewGuid(),
            ApplicationId = id,
            Category = request.Category,
            ResponsibleParty = request.ResponsibleParty,
            RequestedByUserId = staffUser.Id,
            Status = DocRequestStatus.Pending,
            Message = request.Message
        };

        db.DocRequests.Add(docRequest);

        // Update application status if needed
        if (application.Status == ApplicationStatus.InReview)
            application.Status = ApplicationStatus.NeedsDocs;

        await db.SaveChangesAsync();

        await db.Entry(docRequest).Reference(d => d.RequestedBy).LoadAsync();

        return Results.Created($"/api/doc-requests/{docRequest.Id}", docRequest.ToDetailDto());
    }

    private static async Task<IResult> GetDocRequests(Guid id, AppDbContext db)
    {
        var application = await db.LoanApplications.FindAsync(id);
        if (application is null)
            return Results.NotFound();

        var docRequests = await db.DocRequests
            .Include(d => d.RequestedBy)
            .Where(d => d.ApplicationId == id)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();

        return Results.Ok(docRequests.Select(d => d.ToDetailDto()));
    }

    private static async Task<IResult> UpdateDocRequestStatus(
        Guid id,
        UpdateDocRequestStatusRequest request,
        AppDbContext db)
    {
        var docRequest = await db.DocRequests
            .Include(d => d.RequestedBy)
            .FirstOrDefaultAsync(d => d.Id == id);

        if (docRequest is null)
            return Results.NotFound();

        docRequest.Status = request.Status;
        await db.SaveChangesAsync();

        return Results.Ok(docRequest.ToDetailDto());
    }
}
