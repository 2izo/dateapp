using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
   
    public class UsersController :BaseController
    {
        private readonly DataContext _db;

        public UsersController(DataContext db)
        {
            _db = db;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IEnumerable<AppUser>> GetUsers()
        {
            return await _db.Users.ToListAsync();
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<AppUser> GetUsers(int id){
            return await _db.Users.FindAsync(id);
        }
 

    }
}