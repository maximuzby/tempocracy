using MongoDB.Driver;
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

        public Record Get(string recordId)
        {
            return dbContext.Records.Find(x => x.Id == recordId).FirstOrDefault();
        }

        public void Delete(string recordId)
        {
            dbContext.Records.DeleteOne(x => x.Id == recordId);
        }

        public void Save(Record record)
        {
            if (record.IsNew)
            {
                dbContext.Records.InsertOne(record);
            }
            else
            {
                dbContext.Records.ReplaceOne(x => x.Id == record.Id, record);
            }
        }
    }
}
