using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;

namespace Tempocracy.Domain.Queries.Records
{
    public class GetUserRecordsQuery : IQuery<GetUserRecordsResult>
    {
        private const int DefaultTake = 100;

        public int Take { get; set; } = DefaultTake;
    }

    public class UserRecordView
    {
        public string Id { get; set; }

        public string Text { get; set; }
    }

    public class GetUserRecordsResult
    {
        public IList<UserRecordView> Records;
    }

    public interface IGetUserRecordsHandler : IQueryHandler<GetUserRecordsQuery, GetUserRecordsResult> {}

    public class GetUserRecordsHandler : IGetUserRecordsHandler
    {
        private readonly IAppQueryContext context;

        public GetUserRecordsHandler(IAppQueryContext context)
        {
            this.context = context;
        }

        public GetUserRecordsResult Ask(GetUserRecordsQuery query)
        {
            var records = context.Records.Take(query.Take).Select(x => new UserRecordView
            {
                Id = x.Id,
                Text = x.Text
            }).ToList();

            return new GetUserRecordsResult
            {
                Records = records
            };
        }
    }
}
