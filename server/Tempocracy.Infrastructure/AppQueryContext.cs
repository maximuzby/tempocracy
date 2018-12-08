using System.Linq;
using MongoDB.Driver;
using Tempocracy.Domain;
using Tempocracy.Domain.Models;
using Tempocracy.Infrastructure.Database;

namespace Tempocracy.Infrastructure
{
    public class AppQueryContext : IAppQueryContext
    {
        private readonly IMongoDbContext dbContext;

        public AppQueryContext(IMongoDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IQueryable<Record> Records => dbContext.Records.AsQueryable();
    }
}
