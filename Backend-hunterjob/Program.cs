using Backend_hunterjob.src.Data;
using Microsoft.EntityFrameworkCore;
using Backend_hunterjob.src.Services;
using Backend_hunterjob.src.Repositories;

var builder = WebApplication.CreateBuilder(args);

Directory.CreateDirectory("Database");

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddScoped<JobService>();
builder.Services.AddScoped<JobRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");

app.MapGet("/", () => "Server running");
app.MapGet("/api", () => "Server running");

app.MapControllers();

app.Run();
