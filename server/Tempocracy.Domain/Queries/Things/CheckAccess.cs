using Tempocracy.Domain.Models;

namespace Tempocracy.Domain.Queries.Things
{
    public class CheckAccessArgs
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

    public interface ICheckAccess : IQuery<CheckAccessArgs, CheckAccessResult> {}

    public class CheckAccess : ICheckAccess
    {
        private readonly IGetThing getThing;

        public CheckAccess(IGetThing getThing)
        {
            this.getThing = getThing;
        }

        public CheckAccessResult Run(CheckAccessArgs args, IAppQueryContext context)
        {
            var thing = getThing.Run(new GetThingArgs {Id = args.ThingId}, context);

            return new CheckAccessResult
            {
                IsOwner = IsOwner(thing, args.UserId),
                HasAccess = HasAccess(args, thing?.Access)
            };
        }

        private bool IsOwner(Thing thing, string userId)
        {
            return userId != null && thing?.OwnerId == userId;
        }

        private static bool HasAccess(CheckAccessArgs args, Access access)
        {
            return access != null
                   && (access.IsPublic || HasAccessByToken(args, access) || HasInviteFromOwner(args, access));
        }

        private static bool HasAccessByToken(CheckAccessArgs args, Access access)
        {
            return !string.IsNullOrEmpty(args.AccessToken) &&
                   access.AccessToken == args.AccessToken;
        }

        private static bool HasInviteFromOwner(CheckAccessArgs args, Access access)
        {
            return !string.IsNullOrEmpty(args.UserId) 
                && access.InvitedUserIds != null
                && access.InvitedUserIds.Contains(args.UserId);
        }
    }
}
