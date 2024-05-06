using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI;

public class ApplicationDbContext : DbContext
{
    public DbSet<Contact> Contacts { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
        Database.EnsureCreated();
    }
}
