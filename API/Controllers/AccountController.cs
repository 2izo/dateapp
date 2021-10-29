using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks; using API.Data;
using API.Dto;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using API.services;
using API.interfaces;
using System.Linq;

namespace API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly DataContext _db;
        private readonly ITokenService _tokenservice;
        public AccountController(DataContext db, ITokenService token)
        {
            _tokenservice = token;
            _db = db;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(AccountDto accountDto)
        {
            if (await CheckUniqueUsername(accountDto.Username.ToLower())) return BadRequest("Username is taken");
            using var hash = new HMACSHA512();
            var user = new AppUser
            {
                UserName = accountDto.Username,
                PasswordHash = hash.ComputeHash(Encoding.UTF8.GetBytes(accountDto.Password)),
                PasswordSalt = hash.Key
            };
            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();
            var token =_tokenservice.GenerateToken(user);
            return new UserDto{Username=user.UserName, Token=token};
        }
        public async Task<bool> CheckUniqueUsername(string username)
        {

            return await _db.Users.AnyAsync(user => user.UserName.ToLower() == username);
        }
        [Route("login")]
        public async Task<ActionResult<UserDto>> Login(AccountDto accountDto)
        {
            var user = await _db.Users.Include(P=>P.Photos).
            SingleOrDefaultAsync(User => User.UserName == accountDto.Username);
            if (user == null) return Unauthorized("User not found");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedPasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(accountDto.Password));
            for (int i = 0; i < computedPasswordHash.Length; i++)
            {
                if (computedPasswordHash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Wrong password");
                }
            }
            var token =_tokenservice.GenerateToken(user);
            var photoUrl = user.Photos.FirstOrDefault(p=>p.IsMain)?.Url;
            return new UserDto{Username=user.UserName, Token=token, PhotoUrl = photoUrl};
        }
    }
}