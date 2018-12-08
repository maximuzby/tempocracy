using System.Linq;
using Tempocracy.Domain.Models;

namespace Tempocracy.Domain.Queries.Records
{
    public class CheckAccessQuery : IQuery<CheckAccessResult>
    {
        public string RecordId { get; set; }
        public string AccessToken { get; set; }
        public string UserId { get; set; }
    }

    public class CheckAccessResult
    {
        public bool HasAccess { get; set; }
        public bool IsOwner { get; set; }
    }

    public class CheckAccessHandler : IQueryHandler<CheckAccessQuery, CheckAccessResult>
    {
        private readonly IAppQueryContext context;

        public CheckAccessHandler(IAppQueryContext context)
        {
            this.context = context;
        }

        public CheckAccessResult Ask(CheckAccessQuery query)
        {
            var record = context.Records.FirstOrDefault(x => x.Id == query.RecordId);

            return new CheckAccessResult
            {
                IsOwner = IsOwner(record, query.UserId),
                HasAccess = HasAccess(query, record?.Access)
            };
        }

        private static bool IsOwner(Record record, string userId)
        {
            return userId != null && record?.OwnerId == userId;
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
            return !string.IsNullOrEmpty(query.UserId.ToString()) 
                && access.InvitedUserIds != null
                && access.InvitedUserIds.Contains(query.UserId);
        }
    }
}
