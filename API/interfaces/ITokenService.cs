using API.Entities;

namespace API.interfaces
{
    public interface ITokenService
    {
         string GenerateToken(AppUser user);
    }
}