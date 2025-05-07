using Backend_hunterjob.src.Data;
using Microsoft.EntityFrameworkCore;
using Backend_hunterjob.src.Models;

namespace Backend_hunterjob.src.Repositories;

public class JobRepository
{
    private readonly AppDbContext _context;

    public JobRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Job>> GetJobsAsync(int? salary, string? modality, string? status)
    {
        var query = _context.Jobs.AsQueryable();

        if (salary.HasValue)
        {
            query = query.Where(job => job.SalaryInt == 0 || job.SalaryInt >= salary.Value);
        }

        if (!string.IsNullOrEmpty(modality))
        {
            var modalitiesList = modality.Split(',');
            query = query.Where(job => modalitiesList.Contains(job.Modality));
        }

        if (!string.IsNullOrEmpty(status))
        {
            query = query.Where(job => job.Status == status);
        }

        return await query.ToListAsync();
    }

    public async Task<Job?> GetJobByIdAsync(int id)
    {
        return await _context.Jobs.FindAsync(id);
    }
    

    public async Task<Job?> GetJobByJobIdAsync(string jobId)
    {
        return await _context.Jobs.FirstOrDefaultAsync(job => job.JobId == jobId);
    }

    public async Task AddJobAsync(Job job)
    {
        _context.Jobs.Add(job);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateJobAsync(Job job)
    {
        _context.Jobs.Update(job);
        await _context.SaveChangesAsync();
    }

}

