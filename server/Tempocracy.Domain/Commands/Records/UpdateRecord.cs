using System;
using Tempocracy.Domain.Exceptions;

namespace Tempocracy.Domain.Commands.Records
{
    public class UpdateRecordCommand : ICommand
    {
        public string UserId { get; set; }
        public string RecordId { get; set; }
        public string Text { get; set; }
    }

    public interface IUpdateRecordHandler : ICommandHandler<UpdateRecordCommand> {}

    public class UpdateRecordHandler : IUpdateRecordHandler
    {
        private readonly IAppCommandContext context;

        public UpdateRecordHandler(IAppCommandContext context)
        {
            this.context = context;
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

            record.Text = command.Text;
            context.Save(record);
        }
    }
}
