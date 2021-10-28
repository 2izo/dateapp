using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace API.interfaces
{
    public interface IPhotoService
    {
         Task<ImageUploadResult> UploadImageAsync(IFormFile file);
         Task<DeletionResult> DeleteImageAsync(string Id);
    }
}