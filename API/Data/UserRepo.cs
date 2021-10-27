using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepo : IUserRepo
    {
        private readonly DataContext _db;
        public UserRepo(DataContext db)
        {
            _db = db;
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
           return await  _db.Users.Include(p=>p.Photos).SingleOrDefaultAsync(x=>x.Id==id);
        }

        public async Task<AppUser> GetUserByUserNameAsync(string username)
        {
            return await _db.Users.Include(p=>p.Photos).
            SingleOrDefaultAsync(x=>x.UserName==username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _db.Users.Include(p=>p.Photos).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _db.SaveChangesAsync()>1;
        }

        public void Update(AppUser user)
        {
            _db.Entry(user).State = EntityState.Modified;
        }
    }
}