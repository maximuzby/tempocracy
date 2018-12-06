using System.Linq;
using Tempocracy.Domain.Models;

namespace Tempocracy.Domain.Queries.Things
{
    public class GetThingArgs
    {
        public string Id { get; set; }
    }

    public interface IGetThing : IQuery<GetThingArgs, Thing>
    {
    }

    public class GetThing : IGetThing
    {
        public Thing Run(GetThingArgs args, IAppQueryContext context)
        {
            return context.Things.FirstOrDefault(x => x.Id == args.Id);
        }
    }
}
