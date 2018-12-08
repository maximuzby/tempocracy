using System;
using System.Collections.Generic;
using System.Linq;

namespace Tempocracy.Domain.Queries.Records
{
    public class GetUserRecordsQuery : IQuery<GetUserRecordsResult>
    {
        private const int DefaultTake = 100;

        public int Take { get; set; } = DefaultTake;

        public string UserToken { get; set; }
    }

    public class UserRecordView
    {
        public string Id { get; set; }

        public string Text { get; set; }

        public DateTime CreatedAt { get; set; }
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
            var records = context.Records
                .Take(query.Take)
                .Where(x => x.OwnerId == query.UserToken && !x.IsDeleted)
                .Select(x => new UserRecordView
                {
                    Id = x.Id,
                    Text = x.Text,
                    CreatedAt = x.CreatedAtUtc
                }).ToList();

            return new GetUserRecordsResult
            {
                Records = records
            };
        }
    }
}
