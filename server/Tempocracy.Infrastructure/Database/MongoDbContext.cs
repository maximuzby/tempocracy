using System;
using MongoDB.Driver;
using Tempocracy.Domain.Models;
using Tempocracy.Infrastructure.Database;

namespace Tempocracy.Infrastructure
{
    public class MongoDbContext : IMongoDbContext
    {
        private readonly IMongoDatabase database;

        public MongoDbContext(ConnectionOptions settings)
        {
            if (settings.ConnectionString == null)
            {
                throw new ArgumentException("ConnectionString is not specified. Please specify ConnectionString in app secrets file.");
            }
            
            var client = new MongoClient(settings.ConnectionString);
            var databaseName = MongoUrl.Create(settings.ConnectionString).DatabaseName;
            database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<Record> Records => database.GetCollection<Record>(nameof(Record));
    }
}
