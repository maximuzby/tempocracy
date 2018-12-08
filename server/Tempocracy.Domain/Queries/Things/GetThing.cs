using System.Linq;

namespace Tempocracy.Domain.Queries.Things
{
    public class GetThingQuery : IQuery<GetThingResult>
    {
        public string Id { get; set; }
    }

    public class GetThingResult
    {
        public string Id { get; set; }

        public string Text { get; set; }
    }

    public class GetThingHandler : IQueryHandler<GetThingQuery, GetThingResult>
    {
        private readonly IAppQueryContext context;

        public GetThingHandler(IAppQueryContext context)
        {
            this.context = context;
        }

        public GetThingResult Ask(GetThingQuery args)
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
