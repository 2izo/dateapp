using System;

namespace API.Extentions
{
    public static class DateExtention
    {
        public static int GetAge(this DateTime dob)
        {
           DateTime now = DateTime.Now;
            int years = now.Year - dob.Year; 
            years = dob > now.AddYears(-years)? years--:years;
            return years;
        }
    }
}