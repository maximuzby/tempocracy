using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson;

namespace Tempocracy.Domain.Models
{
    /// <summary>
    /// Represents Record Access settings
    /// </summary>
    public class Access
    {
        public bool IsPublic { get; set; }

        public string AccessToken { get; set; }

        public IList<string> InvitedUserIds { get; set; }
    }
}
