using System;
using Tempocracy.Domain;
using Tempocracy.Domain.Models;

namespace Tempocracy.Infrastructure
{
    public class AppCommandContext : IAppCommandContext
    {
        public AppCommandContext(IAppQueryContext queryContext)
        {
            Queries = queryContext;
        }

        public IAppQueryContext Queries { get; }

        public void Save(Thing thing)
        {
            throw new NotImplementedException();
        }
    }
}
