using Tempocracy.Domain.Models;

namespace Tempocracy.Domain
{
    public interface IAppCommandContext
    {
        IAppQueryContext Queries { get; }

        void Save(Thing thing);
    }
}
