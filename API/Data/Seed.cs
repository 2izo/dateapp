using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;

namespace API.Data
{
    public class Seed
    {
        public static async Task Seeding(DataContext db)
        {
            if(db.Users.Any()){  return;}
           
            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSamples.json");
 
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            foreach(var user in users){
                using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("password"));
                user.PasswordSalt = hmac.Key;
                db.Users.Add(user);
                
            }
            await db.SaveChangesAsync();
        }
    }
}