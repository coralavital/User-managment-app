using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hometask.Models
{
	// Address model 
	public class Address
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		[ForeignKey("Id")]
		public string UserId{ get; set; }  = string.Empty;
		[Required]
		public string UserAddress{ get; set; } = string.Empty;
	}
}
