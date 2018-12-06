using System;
using System.Collections.Generic;

namespace Tempocracy.Domain.Models
{
    /// <summary>
    /// It could be Event, Aim, Meeting, etc.
    /// </summary>
    public class Thing
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Text { get; set; }

        public string Category { get; set; }

        public IList<Thing> SubThings { get; set; }

        public SmartDate Start { get; set; }

        public SmartDate Finish { get; set; }

        public Access Access { get; set; }

        public string OwnerId { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime CreatedAtUtc { get; set; }
    }
}
