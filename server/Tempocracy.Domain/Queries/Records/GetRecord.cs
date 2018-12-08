using System.Linq;
using Tempocracy.Domain.Exceptions;

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

    public interface IGetRecordHandler : IQueryHandler<GetRecordQuery, GetRecordResult> {}

    public class GetRecordHandler : IGetRecordHandler
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
                throw new RecordNotFoundException();
            }

            return new GetRecordResult
            {
                Id = record.Id,
                Text = record.Text
            };
        }
    }
}
