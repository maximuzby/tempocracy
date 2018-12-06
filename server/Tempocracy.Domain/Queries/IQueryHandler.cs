namespace Tempocracy.Domain.Queries
{
    public interface IQueryHandler<in TQuery, out TQueryResult>
    {
        TQueryResult Ask(TQuery query, IAppQueryContext context);
    }
}
