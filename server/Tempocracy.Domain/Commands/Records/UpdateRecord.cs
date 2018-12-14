using System;
using Tempocracy.Domain.Commands.Records.Mappers;
using Tempocracy.Domain.Exceptions;

namespace Tempocracy.Domain.Commands.Records
{
    public class UpdateRecordCommand : IRecordSaveCommand
    {
        public string UserId { get; set; }
        public string RecordId { get; set; }
        public string Text { get; set; }
    }

    public interface IUpdateRecordHandler : ICommandHandler<UpdateRecordCommand> {}

    public class UpdateRecordHandler : IUpdateRecordHandler
    {
        private readonly IAppCommandContext context;
        private readonly IRecordMapper mapper;

        public UpdateRecordHandler(IAppCommandContext context, IRecordMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public void Run(UpdateRecordCommand command)
        {
            var record = context.Get(command.RecordId);
            if (record == null)
            {
                throw new RecordNotFoundException();
            }

            if (record.OwnerId != command.UserId)
            {
                throw new RecordAccessException();
            }

            mapper.MapToDomain(record, command);
            context.Save(record);
        }
    }
}
