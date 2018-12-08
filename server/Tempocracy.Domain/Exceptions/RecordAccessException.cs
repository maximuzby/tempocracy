using System;

namespace Tempocracy.Domain.Exceptions
{
    public class RecordAccessException : AccessViolationException
    {
        public RecordAccessException() : base("Record is not accessible for specified UserId") {}
    }
}
