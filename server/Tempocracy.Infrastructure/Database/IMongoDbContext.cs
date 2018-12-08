using MongoDB.Driver;
using Tempocracy.Domain.Models;

namespace Tempocracy.Infrastructure.Database
{
    public interface IMongoDbContext
    {
        IMongoCollection<Record> Records { get; }
    }
}
