using System.Linq;
using API.Dto;
using API.Entities;
using AutoMapper;
namespace API.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
             CreateMap<AppUser,MemeberDto>().ForMember(destinationMember=>destinationMember.PhotoUrl,memberOptions=>memberOptions.MapFrom(
                 sourceMember=>sourceMember.Photos.FirstOrDefault(x=>x.IsMain).Url
             ));

         
             CreateMap<Photo,PhotoDto>();
             
        }

       
    }
}