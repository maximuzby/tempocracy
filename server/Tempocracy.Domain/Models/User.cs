using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Tempocracy.Domain.Models
{
    public class User
    {
        [BsonId]
        [BsonIgnoreIfDefault]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        /// <summary>
        /// Unique
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Not unique. Shown for other users
        /// </summary>
        public string ShownName { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }
    }
}
