namespace Tempocracy.Domain.Queries
{
    public interface IQueryHandler<in TQuery, out TQueryResult> where TQuery: IQuery<TQueryResult>
    {
        TQueryResult Ask(TQuery query);
    }
}
