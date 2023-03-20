using hometask.Models;

namespace hometask.Dtos
{
	// LoginDto
	public class LoginDto
	{
		public string Email { get; set; }
		public string Password { get; set; }
	}

	public class UsersListDto{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public Address Address { get; set; }

	}
}