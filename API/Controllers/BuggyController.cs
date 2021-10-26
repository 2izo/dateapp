using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseController
    {
        private readonly DataContext _db;
        public BuggyController(DataContext db)
        {
            _db = db;
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError(){
            var thing = _db.Users.Find(-1);
            return thing.ToString();
        }
        [HttpGet("not-found")]
        public ActionResult<AppUser> NotFoundError(){
            var thing = _db.Users.Find(-1);
            if(thing==null)
            {
                return NotFound();
            }
            return Ok(thing);
        }
        [HttpGet("bad-request")]
        public ActionResult<string> BadRequestError(){
            return BadRequest("This is a bado request");
        }
        [HttpGet("auth")]
        [Authorize]
        public ActionResult<string> SercretInfoError()
        {
            return"Secret texto";
        }


    }
}