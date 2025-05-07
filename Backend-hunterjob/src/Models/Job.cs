using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
namespace Backend_hunterjob.src.Models;

public class Job
{
    public int Id { get; set; }
    public string? JobId { get; set; }
    public string? Title { get; set; }
    public string? Url { get; set; }
    public string? Company { get; set; }
    public string? Salary { get; set; }
    public string? ContractType { get; set; }
    public string? Schedule { get; set; }
    public string? Modality { get; set; }
    public string? Description { get; set; }
    public string? Location { get; set; }
    public string? Status { get; set; } = "pending";
    public int SalaryInt { get; set; } = 0;

}