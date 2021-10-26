namespace API.Errors
{
    public class ApiException
    {
        public ApiException(string message,  int statusCode,string details=null)
        {
            Message = message;
            Details = details;
            StatusCode = statusCode;
        }

        public string Message { get; set; }
        public string Details { get; set; }
        public int StatusCode { get; set; }

    }
}