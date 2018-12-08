using Tempocracy.Domain.Models;

namespace Tempocracy.Domain
{
    public interface IAppCommandContext
    {
        void Save(Record record);
    }
}
