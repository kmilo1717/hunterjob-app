namespace Backend_hunterjob.src.Requests;


public class SelectDataRequest
{
    public string? Status { get; set; }
    public int? Hybrid { get; set; }
    public int? Remote { get; set; }
    public int? Onsite { get; set; }

}