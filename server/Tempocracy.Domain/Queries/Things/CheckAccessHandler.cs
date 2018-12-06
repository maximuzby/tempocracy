using System.Linq;
using Tempocracy.Domain.Models;

namespace Tempocracy.Domain.Queries.Things
{
    public class CheckAccessQuery
    {
        public string ThingId { get; set; }
        public string AccessToken { get; set; }
        public string UserId { get; set; }
    }

    public class CheckAccessResult
    {
        public bool HasAccess { get; set; }
        public bool IsOwner { get; set; }
    }

    public interface ICheckAccessHandler : IQueryHandler<CheckAccessQuery, CheckAccessResult> {}

    public class CheckAccessHandler : ICheckAccessHandler
    {
        public CheckAccessResult Ask(CheckAccessQuery query, IAppQueryContext context)
        {
            var thing = context.Things.FirstOrDefault(x => x.Id == query.ThingId);

            return new CheckAccessResult
            {
                IsOwner = IsOwner(thing, query.UserId),
                HasAccess = HasAccess(query, thing?.Access)
            };
        }

        private static bool IsOwner(Thing thing, string userId)
        {
            return userId != null && thing?.OwnerId == userId;
        }

        private static bool HasAccess(CheckAccessQuery query, Access access)
        {
            return access != null
                   && (access.IsPublic || HasAccessByToken(query, access) || HasInviteFromOwner(query, access));
        }

        private static bool HasAccessByToken(CheckAccessQuery query, Access access)
        {
            return !string.IsNullOrEmpty(query.AccessToken) &&
                   access.AccessToken == query.AccessToken;
        }

        private static bool HasInviteFromOwner(CheckAccessQuery query, Access access)
        {
            return !string.IsNullOrEmpty(query.UserId) 
                && access.InvitedUserIds != null
                && access.InvitedUserIds.Contains(query.UserId);
        }
    }
}
