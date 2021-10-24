using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _db;

        public UsersController(DataContext db)
        {
            _db = db;
        }
        [HttpGet]
        public IEnumerable<AppUser> GetUsers()
        {
            return _db.Users.ToList();
        }
        [HttpGet("{id}")]
        public AppUser GetUsers(int id){
            return _db.Users.Find(id);
        }
    }
}