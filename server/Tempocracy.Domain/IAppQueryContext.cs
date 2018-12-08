using System.Linq;
using Tempocracy.Domain.Models;

namespace Tempocracy.Domain
{
    public interface IAppQueryContext
    {
        IQueryable<Record> Records { get; }
    }
}
