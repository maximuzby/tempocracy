namespace Tempocracy.Domain.Commands.Records
{
    public interface IRecordSaveCommand : ICommand
    {
        string Text { get; set; }
    }
}
