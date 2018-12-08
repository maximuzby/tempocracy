using Tempocracy.Domain.Models;
using Tempocracy.Domain.Services.Date;

namespace Tempocracy.Domain.Commands.Things
{
    public class CreateThingCommand : ICommand
    {
        public string UserId { get; set; }
        public string Text { get; set; }
    }

    public class CreateThingHandler : ICommandHandler<CreateThingCommand>
    {
        private readonly IDateTimeProvider dateTimeProvider;

        public CreateThingHandler(IDateTimeProvider dateTimeProvider)
        {
            this.dateTimeProvider = dateTimeProvider;
        }

        public void Run(CreateThingCommand args, IAppCommandContext context)
        {
            var thing = new Thing
            {
                OwnerId = args.UserId,
                Text = args.Text,
                CreatedAtUtc = dateTimeProvider.GetDateTimeUtc()
            };
            context.Save(thing);
        }
    }
}
