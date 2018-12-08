using System.Collections.Generic;

namespace Tempocracy.Domain.Exceptions
{
    public class RecordNotFoundException : KeyNotFoundException
    {
        public RecordNotFoundException() : base("Record with specified Id doesn't exist") {}
    }
}
