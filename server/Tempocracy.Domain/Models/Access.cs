using System;
using System.Collections.Generic;
using System.Text;

namespace Tempocracy.Domain.Models
{
    /// <summary>
    /// Represents Thing Access settings
    /// </summary>
    public class Access
    {
        public bool IsPublic { get; set; }

        public string AccessToken { get; set; }

        public IList<string> InvitedUserIds { get; set; }
    }
}
