using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using hometask.Models;
using hometask.Data;
using hometask.Dtos;


namespace hometask.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class AppController : ControllerBase
	{
		public readonly AppDBContext _context;

		private readonly UserManager<IdentityUser> _userManager;

		public AppController(UserManager<IdentityUser> userManager,
		  AppDBContext context)
		{
			_userManager = userManager;
			_context = context;

		}

		// Http GET request for get users list
		[HttpGet("getAllUsers")]
		public IActionResult GetAllUsers()
		{
			var users = _context.Users.ToList();
			var addresses = _context.Addresses.ToList();
			if (users == null || addresses == null)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Users list founded failed!" });
			}
			return Ok(new { users, addresses });
		}


		//[Authorize(Roles = "Admin")]
		[HttpDelete("deleteUser")]
		public async Task<IActionResult> DeleteUser(string id)
		{
			var user = await _userManager.FindByIdAsync(id);
			Address address = _context.Addresses.FirstOrDefault(address => address.UserId == id);
			_context.Addresses.Remove(address);
			_context.SaveChanges();
			var result = await _userManager.DeleteAsync(user);
			if (result == null)
				return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Users list founded failed!" });
			return Ok(new
			{
				message = "User deleted successfully"
			});
		}

		//[Authorize(Roles = "Admin")]
		// Http PUT request for update user data
		[HttpPut("updateUser")]
		public async Task<IActionResult> UpdateUser(UpdateDto dto)
		{
			Address address = _context.Addresses.FirstOrDefault(address => address.UserId == dto.Id);
			IdentityUser user = await _userManager.FindByIdAsync(dto.Id);
			user.UserName = dto.UserName;
			address.UserAddress = dto.UserAddress;
			if (user != null)
			{
				_context.Addresses.Update(address);
				_context.Users.Update(user);
				_context.SaveChanges();
				return Ok(new
				{
					message = "User updated"
				});
			}
			return BadRequest(error: new { message = "There is a problem to update", error = true });
		}

		[HttpGet("getAddresses")]
		public IActionResult GetAddresses(string query)
		{
			var addresses = _context.Addresses.Where(address => address.UserAddress.ToLower().Contains(query.ToLower())).ToList();
			if(addresses.Any()) {
				return Ok(new { addresses });
			}
			return BadRequest(error: new { message = "There is a problem to fetch", error = true });
			
		}

	}
}