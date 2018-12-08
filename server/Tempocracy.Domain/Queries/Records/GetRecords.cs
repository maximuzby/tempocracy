using System.Linq;
using MongoDB.Bson;

namespace Tempocracy.Domain.Queries.Records
{
    public class GetRecordQuery : IQuery<GetRecordResult>
    {
        public string Id { get; set; }
    }

    public class GetRecordResult
    {
        public string Id { get; set; }

        public string Text { get; set; }
    }

    public class GetRecordHandler : IQueryHandler<GetRecordQuery, GetRecordResult>
    {
        private readonly IAppQueryContext context;

        public GetRecordHandler(IAppQueryContext context)
        {
            this.context = context;
        }

        public GetRecordResult Ask(GetRecordQuery args)
        {
            var record = context.Records.FirstOrDefault(x => x.Id == args.Id);
            if (record == null)
            {
                return new GetRecordResult
                {
                    Text = "[NOT FOUND]"
                };
            }

            return new GetRecordResult
            {
                Id = record.Id,
                Text = record.Text
            };
        }
    }
}
