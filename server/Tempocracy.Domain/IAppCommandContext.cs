using Tempocracy.Domain.Models;

namespace Tempocracy.Domain
{
    public interface IAppCommandContext
    {
        Record Get(string recordId);

        void Save(Record record);
    }
}
