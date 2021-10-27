using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.interfaces
{
    public interface IUserRepo
    {
        public void Update(AppUser user);
        public  Task<AppUser> GetUserByIdAsync(int id);
        public  Task<AppUser> GetUserByUserNameAsync(string username);
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<bool> SaveAllAsync();
    }
}