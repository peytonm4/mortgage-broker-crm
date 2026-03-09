using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using MortgageCrm.Api.Data;
using MortgageCrm.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// JSON serialization - handle enums as strings
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Mortgage Broker CRM API", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

// Map endpoints
app.MapPartnerEndpoints();
app.MapLeadEndpoints();
app.MapActivityEndpoints();
app.MapDashboardEndpoints();
app.MapApplicationEndpoints();
app.MapPipelineEndpoints();

// Initialize database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    
    await SeedData.InitializeAsync(db);
}

app.Run();
