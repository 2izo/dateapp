using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public string Url { get; set; }
        public int Id { get; set; }
        public bool IsMain { get; set; }
        public string PublicId{get;set;}
        public AppUser User { get; set; }
        public int UserId { get; set; }
               
    }
}