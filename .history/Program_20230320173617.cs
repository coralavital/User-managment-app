using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using hometask.Data;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

// Add services to the container.
builder.Services.Configure<IdentityOptions>(options =>
{
	options.User.AllowedUserNameCharacters = " !@#$%^&*()*+,-./abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	options.User.RequireUniqueEmail = true;
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 6;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
	options.Password.RequireNonAlphanumeric = false;
});
// For Entity Framework
builder.Services.AddDbContext<AppDBContext>(options => options.UseSqlite("Data Source=./Data/AppDB.db"));

// For Identity
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDBContext>()
    .AddDefaultTokenProviders();

// Adding Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = configuration["JWT:ValidAudience"],
        ValidIssuer = configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy", 
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
			.AllowCredentials()
            .WithOrigins("https://localhost:44429", "https://calm-water-04859b403.azurestaticapps.net");
        });
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "Home Task", Version = "v1" });
	swaggerGenOptions.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme{
		Name = "Authorization",
		In = ParameterLocation.Header,
		Scheme = "Bearer",
		Type = SecuritySchemeType.ApiKey
	});
	swaggerGenOptions.AddSecurityRequirement(new OpenApiSecurityRequirement{
		{
			new OpenApiSecurityScheme{
				Reference = new OpenApiReference{
					Id= "Bearer",
					Type = ReferenceType.SecurityScheme
				}
			},new List<string>()
		}
	});
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "CRUD Application";
	swaggerUIOptions.RoutePrefix = String.Empty;
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API serving a User model.");
    swaggerUIOptions.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

// Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();