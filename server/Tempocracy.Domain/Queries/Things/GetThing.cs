using System.Linq;

namespace Tempocracy.Domain.Queries.Things
{
    public class GetThingQuery
    {
        public string Id { get; set; }
    }

    public class GetThingResult
    {
        public string Id { get; set; }

        public string Text { get; set; }
    }

    public interface IGetThingHandler : IQueryHandler<GetThingQuery, GetThingResult>
    {

    }

    public class GetThingHandler : IGetThingHandler
    {
        public GetThingResult Ask(GetThingQuery args, IAppQueryContext context)
        {
            var thing = context.Things.FirstOrDefault(x => x.Id == args.Id);
            if (thing == null)
            {
                return new GetThingResult
                {
                    Text = "[NOT FOUND]"
                };
            }

            return new GetThingResult
            {
                Id = thing.Id,
                Text = thing.Text
            };
        }
    }
}
