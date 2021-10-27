using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto;
using API.Entities;
using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseController
    {
        private readonly IUserRepo _db;
        private readonly IMapper _map;

        public UsersController(IUserRepo db, IMapper map)
        {
            _map = map;
            _db = db;
        }

        [HttpGet]
        public async Task<IEnumerable<MemeberDto>> GetUsers()
        {
            var users = await _db.GetUsersAsync();
            return _map.Map<IEnumerable<MemeberDto>>(users);
        }


        [HttpGet("{username}")]
        public async Task<MemeberDto> GetUsers(string username)
        {
            return _map.Map<MemeberDto>(await _db.GetUserByUserNameAsync(username));
        }

    }
}