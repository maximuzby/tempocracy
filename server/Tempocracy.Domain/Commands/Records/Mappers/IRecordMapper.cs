using Tempocracy.Domain.Models;
using Tempocracy.Domain.Services;

namespace Tempocracy.Domain.Commands.Records.Mappers
{
    public interface IRecordMapper : IService
    {
        Record MapToDomain(Record domainModel, IRecordSaveCommand command);
    }
}
