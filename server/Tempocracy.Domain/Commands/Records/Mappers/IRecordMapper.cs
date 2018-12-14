using Tempocracy.Domain.Models;

namespace Tempocracy.Domain.Commands.Records.Mappers
{
    public interface IRecordMapper
    {
        Record MapToDomain(Record domainModel, IRecordSaveCommand command);
    }
}
