namespace Tempocracy.Domain.Commands
{
    public interface ICommandHandler<in TCommand> where TCommand : ICommand
    {
        void Run(TCommand args);
    }
}
