using Tempocracy.Domain.Exceptions;

namespace Tempocracy.Domain.Commands.Records
{
    public class DeleteRecordCommand : ICommand
    {
        public string UserId { get; set; }
        public string RecordId { get; set; }
    }

    public interface IDeleteRecordHandler : ICommandHandler<DeleteRecordCommand> {}

    public class DeleteRecordHandler : IDeleteRecordHandler
    {
        private readonly IAppCommandContext context;

        public DeleteRecordHandler(IAppCommandContext context)
        {
            this.context = context;
        }

        public void Run(DeleteRecordCommand command)
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
            
            context.Delete(record.Id);
        }
    }
}
