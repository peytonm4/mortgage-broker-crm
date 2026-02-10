using Microsoft.EntityFrameworkCore;
using MortgageCrm.Api.Entities;

namespace MortgageCrm.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // Existing CRM entities
    public DbSet<Partner> Partners => Set<Partner>();
    public DbSet<Lead> Leads => Set<Lead>();
    public DbSet<Activity> Activities => Set<Activity>();

    // Mortgage platform entities
    public DbSet<User> Users => Set<User>();
    public DbSet<Borrower> Borrowers => Set<Borrower>();
    public DbSet<LoanApplication> LoanApplications => Set<LoanApplication>();
    public DbSet<DocRequest> DocRequests => Set<DocRequest>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Partner
        modelBuilder.Entity<Partner>(e =>
        {
            e.HasKey(p => p.Id);
            e.Property(p => p.Name).HasMaxLength(200).IsRequired();
            e.Property(p => p.Company).HasMaxLength(200);
            e.Property(p => p.Email).HasMaxLength(200);
            e.Property(p => p.Phone).HasMaxLength(50);
            e.Property(p => p.Type).HasConversion<string>().HasMaxLength(50);
        });

        // Lead
        modelBuilder.Entity<Lead>(e =>
        {
            e.HasKey(l => l.Id);
            e.Property(l => l.FirstName).HasMaxLength(100).IsRequired();
            e.Property(l => l.LastName).HasMaxLength(100).IsRequired();
            e.Property(l => l.Email).HasMaxLength(200);
            e.Property(l => l.Phone).HasMaxLength(50);
            e.Property(l => l.LoanType).HasConversion<string>().HasMaxLength(50);
            e.Property(l => l.LoanAmount).HasPrecision(18, 2);
            e.Property(l => l.PropertyAddress).HasMaxLength(500);
            e.Property(l => l.Status).HasConversion<string>().HasMaxLength(50);
            e.Ignore(l => l.FullName);

            e.HasOne(l => l.Partner)
                .WithMany(p => p.Leads)
                .HasForeignKey(l => l.PartnerId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        // Activity
        modelBuilder.Entity<Activity>(e =>
        {
            e.HasKey(a => a.Id);
            e.Property(a => a.Type).HasConversion<string>().HasMaxLength(50);
            e.Property(a => a.Description).HasMaxLength(2000).IsRequired();

            e.HasOne(a => a.Partner)
                .WithMany(p => p.Activities)
                .HasForeignKey(a => a.PartnerId)
                .OnDelete(DeleteBehavior.Cascade);

            e.HasOne(a => a.Lead)
                .WithMany(l => l.Activities)
                .HasForeignKey(a => a.LeadId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // User
        modelBuilder.Entity<User>(e =>
        {
            e.HasKey(u => u.Id);
            e.Property(u => u.Email).HasMaxLength(200).IsRequired();
            e.HasIndex(u => u.Email).IsUnique();
            e.Property(u => u.PasswordHash).HasMaxLength(500).IsRequired();
            e.Property(u => u.Role).HasConversion<string>().HasMaxLength(50);
        });

        // Borrower
        modelBuilder.Entity<Borrower>(e =>
        {
            e.HasKey(b => b.Id);
            e.Property(b => b.FirstName).HasMaxLength(100).IsRequired();
            e.Property(b => b.LastName).HasMaxLength(100).IsRequired();
            e.Property(b => b.Email).HasMaxLength(200).IsRequired();
            e.Property(b => b.Phone).HasMaxLength(50);
            e.Property(b => b.SsnLast4).HasMaxLength(4);
            e.Property(b => b.StreetAddress).HasMaxLength(200);
            e.Property(b => b.City).HasMaxLength(100);
            e.Property(b => b.State).HasMaxLength(50);
            e.Property(b => b.ZipCode).HasMaxLength(20);
            e.Ignore(b => b.FullName);

            e.HasOne(b => b.User)
                .WithOne(u => u.Borrower)
                .HasForeignKey<Borrower>(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // LoanApplication
        modelBuilder.Entity<LoanApplication>(e =>
        {
            e.HasKey(a => a.Id);
            e.Property(a => a.Status).HasConversion<string>().HasMaxLength(50);
            e.Property(a => a.LoanType).HasConversion<string>().HasMaxLength(50);
            e.Property(a => a.LoanAmount).HasPrecision(18, 2);
            e.Property(a => a.PropertyStreetAddress).HasMaxLength(200);
            e.Property(a => a.PropertyCity).HasMaxLength(100);
            e.Property(a => a.PropertyState).HasMaxLength(50);
            e.Property(a => a.PropertyZipCode).HasMaxLength(20);
            e.Property(a => a.PropertyType).HasMaxLength(50);

            e.HasOne(a => a.Borrower)
                .WithMany(b => b.Applications)
                .HasForeignKey(a => a.BorrowerId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // DocRequest
        modelBuilder.Entity<DocRequest>(e =>
        {
            e.HasKey(d => d.Id);
            e.Property(d => d.Category).HasConversion<string>().HasMaxLength(50);
            e.Property(d => d.ResponsibleParty).HasConversion<string>().HasMaxLength(50);
            e.Property(d => d.Status).HasConversion<string>().HasMaxLength(50);
            e.Property(d => d.Message).HasMaxLength(1000);

            e.HasOne(d => d.Application)
                .WithMany(a => a.DocRequests)
                .HasForeignKey(d => d.ApplicationId)
                .OnDelete(DeleteBehavior.Cascade);

            e.HasOne(d => d.RequestedBy)
                .WithMany()
                .HasForeignKey(d => d.RequestedByUserId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }

    public override int SaveChanges()
    {
        SetTimestamps();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        SetTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void SetTimestamps()
    {
        var entries = ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            var now = DateTime.UtcNow;

            if (entry.Entity is Partner partner)
            {
                partner.UpdatedAt = now;
                if (entry.State == EntityState.Added)
                    partner.CreatedAt = now;
            }
            else if (entry.Entity is Lead lead)
            {
                lead.UpdatedAt = now;
                if (entry.State == EntityState.Added)
                    lead.CreatedAt = now;
            }
            else if (entry.Entity is Activity activity && entry.State == EntityState.Added)
            {
                activity.CreatedAt = now;
            }
            else if (entry.Entity is User user)
            {
                user.UpdatedAt = now;
                if (entry.State == EntityState.Added)
                    user.CreatedAt = now;
            }
            else if (entry.Entity is Borrower borrower)
            {
                borrower.UpdatedAt = now;
                if (entry.State == EntityState.Added)
                    borrower.CreatedAt = now;
            }
            else if (entry.Entity is LoanApplication application)
            {
                application.UpdatedAt = now;
                if (entry.State == EntityState.Added)
                    application.CreatedAt = now;
            }
            else if (entry.Entity is DocRequest docRequest)
            {
                docRequest.UpdatedAt = now;
                if (entry.State == EntityState.Added)
                    docRequest.CreatedAt = now;
            }
        }
    }
}
