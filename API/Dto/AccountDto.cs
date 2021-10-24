using System.ComponentModel.DataAnnotations;

namespace API.Dto
{
    public class AccountDto
    {
        [Required]
        [MaxLength(15)]
        public string Username { get; set; }
        [Required]
        public string Password{get;set;}
        
    }
}