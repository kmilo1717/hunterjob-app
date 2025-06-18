using Backend_hunterjob.src.Services;
using Microsoft.AspNetCore.Mvc;
using Backend_hunterjob.src.Models;
using Backend_hunterjob.src.Requests;

namespace BackendHunterJob.Services;

[Route("api/jobs")]
[ApiController]
public class JobController : ControllerBase
{
    private readonly JobService _jobService;

    public JobController(JobService jobService)
    {
        _jobService = jobService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Job>>> GetAllJobsAsync([FromQuery] SelectDataRequest selectDataRequest)
    {
        var jobs = await _jobService.GetAllJobsAsync(selectDataRequest);
        return Ok(jobs);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Job>> GetJobByIdAsync(int id)
    {
        var job = await _jobService.GetByJobIdAsync(id);
        if (job == null)
        {
            return NotFound();
        }
        return Ok(job);
    }

    [HttpPost]
    public async Task<ActionResult<Job>> CreateJobAsync([FromBody] Job job)
    {
        if (job == null)
        {
            return BadRequest("Job data is required.");
        }

        if (string.IsNullOrWhiteSpace(job.JobId))
        {
            return BadRequest("JobId is required.");
        }

        var existingJob = await _jobService.GetJobByJobIdAsync(job.JobId);
        if (existingJob != null)
        {
            return Conflict("JobId already exists.");
        }

        var createdJob = await _jobService.CreateJobAsync(job);
        return StatusCode(201, createdJob);
    }


    [HttpPut("{jobId}")]
    public async Task<IActionResult> UpdateJobAsync(int jobId, [FromBody] Job updatedJob)
    {
        var job = await _jobService.GetByJobIdAsync(jobId);
        if (job == null)
            return NotFound();

        if (!string.IsNullOrEmpty(updatedJob.Title)) job.Title = updatedJob.Title;
        if (!string.IsNullOrEmpty(updatedJob.Company)) job.Company = updatedJob.Company;
        if (!string.IsNullOrEmpty(updatedJob.Salary)) job.Salary = updatedJob.Salary;
        if (updatedJob.SalaryInt > 0) job.SalaryInt = updatedJob.SalaryInt;
        if (!string.IsNullOrEmpty(updatedJob.ContractType)) job.ContractType = updatedJob.ContractType;
        if (!string.IsNullOrEmpty(updatedJob.Schedule)) job.Schedule = updatedJob.Schedule;
        if (!string.IsNullOrEmpty(updatedJob.Modality)) job.Modality = updatedJob.Modality;
        if (!string.IsNullOrEmpty(updatedJob.Description)) job.Description = updatedJob.Description;
        if (!string.IsNullOrEmpty(updatedJob.Location)) job.Location = updatedJob.Location;
        if (!string.IsNullOrEmpty(updatedJob.Status)) job.Status = updatedJob.Status;

        await _jobService.UpdateJobAsync(job);
        return NoContent();
    }


}

