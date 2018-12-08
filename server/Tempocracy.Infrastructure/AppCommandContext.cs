using Tempocracy.Domain;
using Tempocracy.Domain.Models;
using Tempocracy.Infrastructure.Database;

namespace Tempocracy.Infrastructure
{
    public class AppCommandContext : IAppCommandContext
    {
        private readonly IMongoDbContext dbContext;

        public AppCommandContext(IMongoDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void Save(Record record)
        {
            dbContext.Records.InsertOne(record);
        }
    }
}
