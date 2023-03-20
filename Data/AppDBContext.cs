using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using hometask.Models;

namespace hometask.Data
{
	public class AppDBContext : IdentityDbContext<IdentityUser>
	{
		public DbSet<Address> Addresses { get; set; }
		// Users table

		public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
		{

		}
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{

			modelBuilder.Entity<Address>().Property(t => t.Id).ValueGeneratedOnAdd().HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

			// Seeding data
			string[] names = { "Coral Avital", "Rinat Atias", "Bar Avital", "Adir Alfasi", "Amit Avital", "Tali Levi", "Tami Vanunu", "Eli Dahan", "Iris Avital", "Shir Levi" };
			string[] emails = { "coral", "rinat", "bar", "adir", "amit", "tali", "tami", "eli", "iris", "shir" };
			string[] addresses = { "Tel Aviv", "Haifa", "Ashdod", "Tel Aviv", "Ramat Gan", "Tel Aviv", "Haifa", "Ashdod", "Tel Aviv", "Ramat Gan" };
			IdentityUser[] usersToSeed = new IdentityUser[10];
			Address[] addressesToSeed = new Address[10];

			for (int i = 1; i <= 10; i++)
			{
				var user = new IdentityUser
				{
					Email = $"{emails[i - 1]}@gmail.com",
					NormalizedEmail = $"{emails[i - 1]}@gmail.com".ToUpper(),
					SecurityStamp = Guid.NewGuid().ToString(),
					UserName = $"{names[i - 1]}",
					NormalizedUserName = $"{names[i - 1]}".ToUpper(),
					LockoutEnabled = true,
				};
				PasswordHasher<IdentityUser> passwordHasher = new PasswordHasher<IdentityUser>();
				user.PasswordHash = passwordHasher.HashPassword(user, "123456");

				usersToSeed[i - 1] = user;

				addressesToSeed[i - 1] = new Address
				{
					Id = i,
					UserId = usersToSeed[i - 1].Id,
					UserAddress = $"{addresses[i - 1]}"
				};
			}
			modelBuilder.Entity<Address>().HasData(addressesToSeed);
			modelBuilder.Entity<IdentityUser>().HasData(usersToSeed);
			base.OnModelCreating(modelBuilder);
		}
	}
}
