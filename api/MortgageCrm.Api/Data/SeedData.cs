using MortgageCrm.Api.Entities;

namespace MortgageCrm.Api.Data;

public static class SeedData
{
    public static async Task InitializeAsync(AppDbContext context)
    {
        var now = DateTime.UtcNow;

        // Seed users if not exists
        await SeedUsersAsync(context, now);

        if (context.Partners.Any())
            return; // Already seeded

        // Partners
        var sarahChen = new Partner
        {
            Id = Guid.NewGuid(),
            Name = "Sarah Chen",
            Company = "Keller Williams",
            Type = PartnerType.Realtor,
            Email = "sarah.chen@kw.com",
            Phone = "(555) 123-4567",
            LastContactedAt = now.AddDays(-5),
            Notes = "Top producer in the area. Prefers text over calls.",
            CreatedAt = now.AddMonths(-6),
            UpdatedAt = now.AddDays(-5)
        };

        var mikeRodriguez = new Partner
        {
            Id = Guid.NewGuid(),
            Name = "Mike Rodriguez",
            Company = "Rodriguez Tax & Accounting",
            Type = PartnerType.CPA,
            Email = "mike@rodrigueztax.com",
            Phone = "(555) 234-5678",
            LastContactedAt = now.AddDays(-12),
            Notes = "Sends clients during tax season. Good for refi referrals.",
            CreatedAt = now.AddMonths(-4),
            UpdatedAt = now.AddDays(-12)
        };

        var jenniferWalsh = new Partner
        {
            Id = Guid.NewGuid(),
            Name = "Jennifer Walsh",
            Company = "Walsh Law Group",
            Type = PartnerType.Attorney,
            Email = "jwash@walshlaw.com",
            Phone = "(555) 345-6789",
            LastContactedAt = now.AddDays(-30),
            Notes = "Estate planning attorney. Refers clients needing reverse mortgages.",
            CreatedAt = now.AddMonths(-8),
            UpdatedAt = now.AddDays(-30)
        };

        var davidKim = new Partner
        {
            Id = Guid.NewGuid(),
            Name = "David Kim",
            Company = "RE/MAX Elite",
            Type = PartnerType.Realtor,
            Email = "david.kim@remax.com",
            Phone = "(555) 456-7890",
            LastContactedAt = now.AddDays(-3),
            Notes = "Works with first-time homebuyers. Very responsive.",
            CreatedAt = now.AddMonths(-3),
            UpdatedAt = now.AddDays(-3)
        };

        var lisaThompson = new Partner
        {
            Id = Guid.NewGuid(),
            Name = "Lisa Thompson",
            Company = null,
            Type = PartnerType.PastClient,
            Email = "lisa.t@email.com",
            Phone = "(555) 567-8901",
            LastContactedAt = now.AddDays(-45),
            Notes = "Closed her loan last year. Has sent 2 referrals since.",
            CreatedAt = now.AddMonths(-12),
            UpdatedAt = now.AddDays(-45)
        };

        var partners = new[] { sarahChen, mikeRodriguez, jenniferWalsh, davidKim, lisaThompson };
        context.Partners.AddRange(partners);

        // Leads
        var leads = new List<Lead>
        {
            new()
            {
                Id = Guid.NewGuid(),
                PartnerId = sarahChen.Id,
                FirstName = "John",
                LastName = "Martinez",
                Email = "john.martinez@email.com",
                Phone = "(555) 111-2222",
                LoanType = LoanType.Purchase,
                LoanAmount = 425000m,
                PropertyAddress = "123 Oak Street, Austin, TX 78701",
                Status = LeadStatus.InProgress,
                Notes = "Pre-approved. Looking at homes this weekend.",
                CreatedAt = now.AddDays(-14),
                UpdatedAt = now.AddDays(-2)
            },
            new()
            {
                Id = Guid.NewGuid(),
                PartnerId = sarahChen.Id,
                FirstName = "Emily",
                LastName = "Johnson",
                Email = "emily.j@email.com",
                Phone = "(555) 222-3333",
                LoanType = LoanType.Purchase,
                LoanAmount = 550000m,
                PropertyAddress = null,
                Status = LeadStatus.Contacted,
                Notes = "Just started house hunting. Needs to sell current home first.",
                CreatedAt = now.AddDays(-7),
                UpdatedAt = now.AddDays(-5)
            },
            new()
            {
                Id = Guid.NewGuid(),
                PartnerId = sarahChen.Id,
                FirstName = "Robert",
                LastName = "Williams",
                Email = "rwilliams@email.com",
                Phone = "(555) 333-4444",
                LoanType = LoanType.Purchase,
                LoanAmount = 380000m,
                PropertyAddress = "456 Maple Ave, Austin, TX 78702",
                Status = LeadStatus.Funded,
                Notes = "Closed! Great experience.",
                CreatedAt = now.AddDays(-60),
                UpdatedAt = now.AddDays(-30)
            },
            new()
            {
                Id = Guid.NewGuid(),
                PartnerId = mikeRodriguez.Id,
                FirstName = "Patricia",
                LastName = "Davis",
                Email = "pdavis@email.com",
                Phone = "(555) 444-5555",
                LoanType = LoanType.Refinance,
                LoanAmount = 320000m,
                PropertyAddress = "789 Pine Road, Austin, TX 78703",
                Status = LeadStatus.InProgress,
                Notes = "Cash-out refi for home improvements.",
                CreatedAt = now.AddDays(-10),
                UpdatedAt = now.AddDays(-3)
            },
            new()
            {
                Id = Guid.NewGuid(),
                PartnerId = mikeRodriguez.Id,
                FirstName = "Michael",
                LastName = "Brown",
                Email = "mbrown@email.com",
                Phone = "(555) 555-6666",
                LoanType = LoanType.Refinance,
                LoanAmount = 275000m,
                PropertyAddress = "321 Elm Street, Austin, TX 78704",
                Status = LeadStatus.New,
                Notes = "Wants to lower monthly payment.",
                CreatedAt = now.AddDays(-2),
                UpdatedAt = now.AddDays(-2)
            },
            new()
            {
                Id = Guid.NewGuid(),
                PartnerId = davidKim.Id,
                FirstName = "Jessica",
                LastName = "Garcia",
                Email = "jgarcia@email.com",
                Phone = "(555) 666-7777",
                LoanType = LoanType.Purchase,
                LoanAmount = 295000m,
                PropertyAddress = null,
                Status = LeadStatus.Contacted,
                Notes = "First-time buyer. Needs FHA loan education.",
                CreatedAt = now.AddDays(-5),
                UpdatedAt = now.AddDays(-4)
            },
            new()
            {
                Id = Guid.NewGuid(),
                PartnerId = davidKim.Id,
                FirstName = "Christopher",
                LastName = "Miller",
                Email = "cmiller@email.com",
                Phone = "(555) 777-8888",
                LoanType = LoanType.Purchase,
                LoanAmount = 475000m,
                PropertyAddress = "654 Cedar Lane, Austin, TX 78705",
                Status = LeadStatus.InProgress,
                Notes = "Under contract. Appraisal scheduled for next week.",
                CreatedAt = now.AddDays(-21),
                UpdatedAt = now.AddDays(-1)
            },
            new()
            {
                Id = Guid.NewGuid(),
                PartnerId = lisaThompson.Id,
                FirstName = "Amanda",
                LastName = "Wilson",
                Email = "awilson@email.com",
                Phone = "(555) 888-9999",
                LoanType = LoanType.Purchase,
                LoanAmount = 350000m,
                PropertyAddress = null,
                Status = LeadStatus.New,
                Notes = "Lisa's coworker. Just starting to look.",
                CreatedAt = now.AddDays(-1),
                UpdatedAt = now.AddDays(-1)
            },
            new()
            {
                Id = Guid.NewGuid(),
                PartnerId = null, // No partner attribution
                FirstName = "Daniel",
                LastName = "Taylor",
                Email = "dtaylor@email.com",
                Phone = "(555) 999-0000",
                LoanType = LoanType.HELOC,
                LoanAmount = 100000m,
                PropertyAddress = "987 Birch Blvd, Austin, TX 78706",
                Status = LeadStatus.Contacted,
                Notes = "Walk-in. Wants HELOC for business expansion.",
                CreatedAt = now.AddDays(-8),
                UpdatedAt = now.AddDays(-6)
            },
            new()
            {
                Id = Guid.NewGuid(),
                PartnerId = jenniferWalsh.Id,
                FirstName = "Margaret",
                LastName = "Anderson",
                Email = "manderson@email.com",
                Phone = "(555) 000-1111",
                LoanType = LoanType.Refinance,
                LoanAmount = 180000m,
                PropertyAddress = "147 Walnut Way, Austin, TX 78707",
                Status = LeadStatus.Lost,
                Notes = "Decided to stay with current lender.",
                CreatedAt = now.AddDays(-45),
                UpdatedAt = now.AddDays(-30)
            }
        };

        context.Leads.AddRange(leads);

        // Activities
        var activities = new List<Activity>
        {
            // Sarah Chen activities
            new() { Id = Guid.NewGuid(), PartnerId = sarahChen.Id, Type = ActivityType.Call, Description = "Quarterly check-in call. Discussed market conditions.", CreatedAt = now.AddDays(-5) },
            new() { Id = Guid.NewGuid(), PartnerId = sarahChen.Id, Type = ActivityType.Email, Description = "Sent updated rate sheet.", CreatedAt = now.AddDays(-12) },
            new() { Id = Guid.NewGuid(), PartnerId = sarahChen.Id, Type = ActivityType.Meeting, Description = "Lunch meeting to discuss co-marketing opportunities.", CreatedAt = now.AddDays(-30) },

            // Mike Rodriguez activities
            new() { Id = Guid.NewGuid(), PartnerId = mikeRodriguez.Id, Type = ActivityType.Call, Description = "Discussed tax season referral strategy.", CreatedAt = now.AddDays(-12) },
            new() { Id = Guid.NewGuid(), PartnerId = mikeRodriguez.Id, Type = ActivityType.Note, Description = "Mike mentioned he has 3 clients who might need refis.", CreatedAt = now.AddDays(-12) },

            // David Kim activities
            new() { Id = Guid.NewGuid(), PartnerId = davidKim.Id, Type = ActivityType.Call, Description = "Quick call about Christopher Miller's file status.", CreatedAt = now.AddDays(-3) },
            new() { Id = Guid.NewGuid(), PartnerId = davidKim.Id, Type = ActivityType.Email, Description = "Sent pre-approval letter for Jessica Garcia.", CreatedAt = now.AddDays(-4) },

            // Lisa Thompson activities
            new() { Id = Guid.NewGuid(), PartnerId = lisaThompson.Id, Type = ActivityType.Call, Description = "Called to thank her for Amanda Wilson referral.", CreatedAt = now.AddDays(-1) },

            // Jennifer Walsh activities
            new() { Id = Guid.NewGuid(), PartnerId = jenniferWalsh.Id, Type = ActivityType.Email, Description = "Sent info on reverse mortgage products.", CreatedAt = now.AddDays(-30) },

            // Lead activities - John Martinez
            new() { Id = Guid.NewGuid(), LeadId = leads[0].Id, Type = ActivityType.Call, Description = "Initial consultation call. Discussed loan options.", CreatedAt = now.AddDays(-14) },
            new() { Id = Guid.NewGuid(), LeadId = leads[0].Id, Type = ActivityType.StatusChange, Description = "Status changed from New to Contacted", CreatedAt = now.AddDays(-14) },
            new() { Id = Guid.NewGuid(), LeadId = leads[0].Id, Type = ActivityType.Email, Description = "Sent pre-approval letter.", CreatedAt = now.AddDays(-12) },
            new() { Id = Guid.NewGuid(), LeadId = leads[0].Id, Type = ActivityType.StatusChange, Description = "Status changed from Contacted to InProgress", CreatedAt = now.AddDays(-10) },
            new() { Id = Guid.NewGuid(), LeadId = leads[0].Id, Type = ActivityType.Note, Description = "Received signed disclosures.", CreatedAt = now.AddDays(-8) },

            // Lead activities - Emily Johnson
            new() { Id = Guid.NewGuid(), LeadId = leads[1].Id, Type = ActivityType.Call, Description = "Intro call. Explained the process for buy before sell.", CreatedAt = now.AddDays(-7) },
            new() { Id = Guid.NewGuid(), LeadId = leads[1].Id, Type = ActivityType.StatusChange, Description = "Status changed from New to Contacted", CreatedAt = now.AddDays(-7) },

            // Lead activities - Christopher Miller
            new() { Id = Guid.NewGuid(), LeadId = leads[6].Id, Type = ActivityType.StatusChange, Description = "Status changed from New to Contacted", CreatedAt = now.AddDays(-20) },
            new() { Id = Guid.NewGuid(), LeadId = leads[6].Id, Type = ActivityType.StatusChange, Description = "Status changed from Contacted to InProgress", CreatedAt = now.AddDays(-15) },
            new() { Id = Guid.NewGuid(), LeadId = leads[6].Id, Type = ActivityType.Note, Description = "Appraisal ordered.", CreatedAt = now.AddDays(-5) },
            new() { Id = Guid.NewGuid(), LeadId = leads[6].Id, Type = ActivityType.Call, Description = "Updated client on appraisal timeline.", CreatedAt = now.AddDays(-1) },

            // Lead activities - Robert Williams (funded)
            new() { Id = Guid.NewGuid(), LeadId = leads[2].Id, Type = ActivityType.StatusChange, Description = "Status changed from InProgress to Funded", CreatedAt = now.AddDays(-30) },
            new() { Id = Guid.NewGuid(), LeadId = leads[2].Id, Type = ActivityType.Note, Description = "Sent closing gift.", CreatedAt = now.AddDays(-29) },
        };

        context.Activities.AddRange(activities);

        await context.SaveChangesAsync();
    }

    private static async Task SeedUsersAsync(AppDbContext context, DateTime now)
    {
        if (context.Users.Any())
            return; // Users already seeded

        // Simple hash for demo purposes - in production use proper password hashing
        var demoPasswordHash = "demo123"; // Would use BCrypt or similar in production

        var adminUser = new User
        {
            Id = Guid.NewGuid(),
            Email = "admin@mortgagecrm.com",
            PasswordHash = demoPasswordHash,
            Role = UserRole.Admin,
            CreatedAt = now,
            UpdatedAt = now
        };

        var staffUser = new User
        {
            Id = Guid.NewGuid(),
            Email = "staff@mortgagecrm.com",
            PasswordHash = demoPasswordHash,
            Role = UserRole.Staff,
            CreatedAt = now,
            UpdatedAt = now
        };

        context.Users.AddRange(adminUser, staffUser);
        await context.SaveChangesAsync();
    }
}
