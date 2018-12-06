using System.Linq;
using Tempocracy.Domain.Models;

namespace Tempocracy.Domain
{
    public interface IAppQueryContext
    {
        IQueryable<Thing> Things { get; }
    }
}
