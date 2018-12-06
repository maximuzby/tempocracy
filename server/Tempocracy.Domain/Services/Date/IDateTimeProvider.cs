using System;

namespace Tempocracy.Domain.Services.Date
{
    public interface IDateTimeProvider : IService
    {
        DateTime GetDateTimeUtc();
    }
}
