using Tempocracy.Domain.Commands.Records.Mappers;
using Tempocracy.Domain.Models;
using Tempocracy.Domain.Services.Date;

namespace Tempocracy.Domain.Commands.Records
{
    public class CreateRecordCommand : IRecordSaveCommand
    {
        public string UserId { get; set; }
        public string Text { get; set; }
    }

    public interface ICreateRecordHandler : ICommandHandler<CreateRecordCommand> {}

    public class CreateRecordHandler : ICreateRecordHandler
    {
        private readonly IDateTimeProvider dateTimeProvider;
        private readonly IAppCommandContext context;
        private readonly IRecordMapper mapper;

        public CreateRecordHandler(
            IDateTimeProvider dateTimeProvider, 
            IAppCommandContext context, 
            IRecordMapper mapper)
        {
            this.dateTimeProvider = dateTimeProvider;
            this.context = context;
            this.mapper = mapper;
        }

        public void Run(CreateRecordCommand command)
        {
            var record = mapper.MapToDomain(new Record
            {
                OwnerId = command.UserId,
                CreatedAtUtc = dateTimeProvider.GetDateTimeUtc()
            }, command);

            context.Save(record);
        }
    }
}
