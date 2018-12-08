using System.Linq;
using Tempocracy.Domain;
using Tempocracy.Domain.Models;

namespace Tempocracy.Infrastructure
{
    public class AppQueryContext : IAppQueryContext
    {
        public IQueryable<Thing> Things => new[]
        {
            new Thing {Text = "Test"}
        }.AsQueryable();
    }
}
