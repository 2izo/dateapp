using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.Dto;
using API.Entities;
using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseController
    {
        private readonly IUserRepo _db;
        private readonly IMapper _map;
        private readonly IPhotoService _photoService;

        public UsersController(IUserRepo db, IMapper map, IPhotoService photoService)
        {
            _photoService = photoService;
            _map = map;
            _db = db;
        }

        [HttpGet]
        public async Task<IEnumerable<MemeberDto>> GetUsers()
        {
            var users = await _db.GetUsersAsync();
            return _map.Map<IEnumerable<MemeberDto>>(users);
        }


        [HttpGet("{username}",Name ="GetUser")]
        public async Task<MemeberDto> GetUsers(string username)
        {
            return _map.Map<MemeberDto>(await _db.GetUserByUserNameAsync(username));
        }
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _db.GetUserByUserNameAsync(username);
            _map.Map(memberUpdateDto, user);
            _db.Update(user);
            if ((bool)(await _db.SaveAllAsync())) return NoContent();
            return BadRequest("failed to update user");
        }
        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
           var user = await _db.GetUserByUserNameAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
           var result = await _photoService.UploadImageAsync(file);
           if(result.Error!=null){
               return BadRequest("Cant Upload Photo");
           }
           var photo = new Photo{
               Url=result.SecureUrl.AbsoluteUri,
               PublicId = result.PublicId
           };
           if(user.Photos.Count < 1){
               photo.IsMain = true;
           }
           user.Photos.Add(photo);
           if(await _db.SaveAllAsync()){
         return CreatedAtRoute("GetUser",new{username=user.UserName},_map.Map<PhotoDto>(photo));
           }
           return BadRequest("Cant Upload Photo");

        }


    }
}