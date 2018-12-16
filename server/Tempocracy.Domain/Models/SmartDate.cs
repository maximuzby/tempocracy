using System;

namespace Tempocracy.Domain.Models
{
    public class SmartDate
    {
        public DateTime? DateTime { get; set; }

        public DateAccuracy Accuracy { get; set; }

        public string Description { get; set; }
    }
}
