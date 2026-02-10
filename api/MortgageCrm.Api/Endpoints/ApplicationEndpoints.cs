using Microsoft.EntityFrameworkCore;
using MortgageCrm.Api.Data;
using MortgageCrm.Api.Dtos;
using MortgageCrm.Api.Entities;

namespace MortgageCrm.Api.Endpoints;

public static class ApplicationEndpoints
{
    public static void MapApplicationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/applications").WithTags("Applications");

        group.MapPost("/", StartApplication);
        group.MapGet("/{id:guid}", GetById);
        group.MapPut("/{id:guid}/step1", UpdateStep1);
        group.MapPut("/{id:guid}/step2", UpdateStep2);
        group.MapPost("/{id:guid}/submit", Submit);
        group.MapGet("/{id:guid}/doc-requests", GetDocRequests);
    }

    private static async Task<IResult> StartApplication(
        StartApplicationRequest request,
        AppDbContext db)
    {
        // Create user account for borrower
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            PasswordHash = "temp", // Would generate secure temp password in production
            Role = UserRole.Borrower
        };

        // Create borrower profile
        var borrower = new Borrower
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Phone = request.Phone
        };

        // Create loan application
        var application = new LoanApplication
        {
            Id = Guid.NewGuid(),
            BorrowerId = borrower.Id,
            Status = ApplicationStatus.Draft,
            LoanType = ApplicationLoanType.Purchase,
            LoanAmount = 0,
            CurrentStep = 1
        };

        db.Users.Add(user);
        db.Borrowers.Add(borrower);
        db.LoanApplications.Add(application);
        await db.SaveChangesAsync();

        return Results.Created(
            $"/api/applications/{application.Id}",
            new StartApplicationResponse(application.Id, borrower.Id, user.Id)
        );
    }

    private static async Task<IResult> GetById(Guid id, AppDbContext db)
    {
        var application = await db.LoanApplications
            .Include(a => a.Borrower)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (application is null)
            return Results.NotFound();

        return Results.Ok(application.ToDto());
    }

    private static async Task<IResult> UpdateStep1(
        Guid id,
        UpdatePersonalInfoRequest request,
        AppDbContext db)
    {
        var application = await db.LoanApplications
            .Include(a => a.Borrower)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (application is null)
            return Results.NotFound();

        var borrower = application.Borrower!;
        borrower.FirstName = request.FirstName;
        borrower.LastName = request.LastName;
        borrower.Email = request.Email;
        borrower.Phone = request.Phone;
        borrower.SsnLast4 = request.SsnLast4;
        borrower.StreetAddress = request.StreetAddress;
        borrower.City = request.City;
        borrower.State = request.State;
        borrower.ZipCode = request.ZipCode;

        if (application.CurrentStep < 2)
            application.CurrentStep = 2;

        await db.SaveChangesAsync();

        return Results.Ok(application.ToDto());
    }

    private static async Task<IResult> UpdateStep2(
        Guid id,
        UpdateLoanDetailsRequest request,
        AppDbContext db)
    {
        var application = await db.LoanApplications
            .Include(a => a.Borrower)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (application is null)
            return Results.NotFound();

        application.LoanType = request.LoanType;
        application.LoanAmount = request.LoanAmount;
        application.PropertyStreetAddress = request.PropertyStreetAddress;
        application.PropertyCity = request.PropertyCity;
        application.PropertyState = request.PropertyState;
        application.PropertyZipCode = request.PropertyZipCode;
        application.PropertyType = request.PropertyType;

        if (application.CurrentStep < 3)
            application.CurrentStep = 3;

        await db.SaveChangesAsync();

        return Results.Ok(application.ToDto());
    }

    private static async Task<IResult> Submit(Guid id, AppDbContext db)
    {
        var application = await db.LoanApplications
            .Include(a => a.Borrower)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (application is null)
            return Results.NotFound();

        if (application.Status != ApplicationStatus.Draft)
            return Results.BadRequest("Application has already been submitted");

        application.Status = ApplicationStatus.Received;
        application.SubmittedAt = DateTime.UtcNow;

        await db.SaveChangesAsync();

        return Results.Ok(application.ToDto());
    }

    private static async Task<IResult> GetDocRequests(Guid id, AppDbContext db)
    {
        var application = await db.LoanApplications.FindAsync(id);
        if (application is null)
            return Results.NotFound();

        var docRequests = await db.DocRequests
            .Where(d => d.ApplicationId == id)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();

        return Results.Ok(docRequests.Select(d => d.ToDto()));
    }
}
