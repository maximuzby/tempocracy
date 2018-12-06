using Tempocracy.Domain.Models;
using Tempocracy.Domain.Services.Date;

namespace Tempocracy.Domain.Commands.Things
{
    public class CreateThingArgs
    {
        public string UserId { get; set; }
        public string Text { get; set; }
    }

    public interface ICreateThing : ICommand<CreateThingArgs> {}

    public class CreateThing : ICreateThing
    {
        private readonly IDateTimeProvider dateTimeProvider;

        public CreateThing(IDateTimeProvider dateTimeProvider)
        {
            this.dateTimeProvider = dateTimeProvider;
        }

        public void Run(CreateThingArgs args, IAppCommandContext context)
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
