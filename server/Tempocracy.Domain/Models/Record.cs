using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Tempocracy.Domain.Models
{
    /// <summary>
    /// It could be Event, Aim, Meeting, etc.
    /// </summary>
    public class Record
    {
        [BsonId]
        [BsonIgnoreIfDefault]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public bool IsNew => string.IsNullOrEmpty(Id);

        public string Title { get; set; }

        public string Text { get; set; }

        public string Category { get; set; }

        public IList<Record> SubRecords { get; set; }

        public SmartDate Start { get; set; }

        public SmartDate Finish { get; set; }

        public Access Access { get; set; }

        public string OwnerId { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime CreatedAtUtc { get; set; }
    }
}
