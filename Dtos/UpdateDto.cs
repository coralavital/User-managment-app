namespace hometask.Dtos
{
	// UpdateDto model to get from the frontend the update user details
	public class UpdateDto
	{
		public string Id { get; set; }
		public string UserName { get; set; }
		public string Email { get; set; }
		public string UserAddress{ get; set; }
	}
}