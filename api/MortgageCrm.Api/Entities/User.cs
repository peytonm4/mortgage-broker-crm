namespace MortgageCrm.Api.Entities;

public class User
{
    public Guid Id { get; set; }
    public required string Email { get; set; }
    public required string PasswordHash { get; set; }
    public UserRole Role { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation
    public Borrower? Borrower { get; set; }
}

public enum UserRole
{
    Borrower,
    Staff,
    Admin
}
