using Microsoft.EntityFrameworkCore;
using Backend_hunterjob.src.Models;
namespace Backend_hunterjob.src.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Job> Jobs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder){
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Job>().HasIndex(j => j.JobId).IsUnique();
    }
}