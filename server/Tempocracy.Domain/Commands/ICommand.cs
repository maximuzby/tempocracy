namespace Tempocracy.Domain.Commands
{
    public interface ICommand<in TCommandArgs>
    {
        void Run(TCommandArgs args, IAppCommandContext context);
    }
}
