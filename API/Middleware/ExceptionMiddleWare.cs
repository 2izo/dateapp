using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleWare
    {
        private readonly IHostEnvironment _host;
        private readonly ILogger _logger;
        private readonly RequestDelegate _next;
        public ExceptionMiddleWare(ILogger<ExceptionMiddleWare> logger, IHostEnvironment host, RequestDelegate next)
        {
            _next = next;
            _logger = logger;
            _host = host;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try{
                await _next(context);
            }
            catch(Exception ex){
                _logger.LogError(ex,ex.Message);
                context.Response.ContentType="application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                var response = _host.IsDevelopment()?new ApiException(ex.Message,context.Response.StatusCode,ex.StackTrace?.ToString()):new ApiException(ex.Message,context.Response.StatusCode);
                var options = new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};
                var json = JsonSerializer.Serialize(response,options);
                await context.Response.WriteAsync(json);
            }
        }
    }
}