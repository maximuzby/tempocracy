using MongoDB.Bson;
using Tempocracy.Domain.Models;
using Tempocracy.Domain.Services.Date;

namespace Tempocracy.Domain.Commands.Records
{
    public class CreateRecordCommand : ICommand
    {
        public string UserId { get; set; }
        public string Text { get; set; }
    }

    public interface ICreateRecordHandler : ICommandHandler<CreateRecordCommand> {}

    public class CreateRecordHandler : ICreateRecordHandler
    {
        private readonly IDateTimeProvider dateTimeProvider;
        private readonly IAppCommandContext context;

        public CreateRecordHandler(
            IDateTimeProvider dateTimeProvider, 
            IAppCommandContext context)
        {
            this.dateTimeProvider = dateTimeProvider;
            this.context = context;
        }

        public void Run(CreateRecordCommand args)
        {
            var record = new Record
            {
                OwnerId = args.UserId,
                Text = args.Text,
                CreatedAtUtc = dateTimeProvider.GetDateTimeUtc()
            };
            context.Save(record);
        }
    }
}
