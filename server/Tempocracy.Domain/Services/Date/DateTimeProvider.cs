using System;

namespace Tempocracy.Domain.Services.Date
{
    public class DateTimeProvider : IDateTimeProvider
    {
        public DateTime GetDateTimeUtc()
        {
            return DateTime.UtcNow;
        }
    }
}
