using Tempocracy.Domain.Models;

namespace Tempocracy.Domain.Commands.Records.Mappers
{
    public class RecordMapper : IRecordMapper
    {
        public Record MapToDomain(Record domainModel, IRecordSaveCommand command)
        {
            domainModel.Text = command.Text;
            return domainModel;
        }
    }
}
