using System;
using System.Collections.Generic;

namespace API.Dto
{
    public class MemeberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public string KnownAs { get; set; }
        public string City { get; set; }
        public string Country { get; set; } 
        public string Gender { get; set; }
        public string LookingFor { get; set; }
        public string Intrests { get; set; }
        public string Introduction { get; set; }
        public int Age { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public ICollection<PhotoDto> Photos{get;set;}
    }
}