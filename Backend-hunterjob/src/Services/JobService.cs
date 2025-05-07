using Backend_hunterjob.src.Models;
using Backend_hunterjob.src.Repositories;

namespace Backend_hunterjob.src.Services;
public class JobService
{
    private readonly JobRepository _jobRepository;

    public JobService(JobRepository jobRepository)
    {
        _jobRepository = jobRepository;
    }

    public async Task<IEnumerable<Job>> GetAllJobsAsync(int? salary, string? modalities, string? status)
    {
        return await _jobRepository.GetJobsAsync(salary, modalities, status);
    }

    public async Task<Job> CreateJobAsync(Job job)
    {
        await _jobRepository.AddJobAsync(job);
        return job;
    }

    public async Task<Job?> GetByJobIdAsync(int id)
    {
        return await _jobRepository.GetJobByIdAsync(id);
    }

    public async Task UpdateJobAsync(Job job)
    {
        await _jobRepository.UpdateJobAsync(job);
    }

        public async Task<Job?> GetJobByJobIdAsync(string jobId)
    {
        return await _jobRepository.GetJobByJobIdAsync(jobId);
    }
}

