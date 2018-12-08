using System;
using Microsoft.AspNetCore.Mvc;
using Tempocracy.Domain.Commands.Records;
using Tempocracy.Domain.Queries.Records;

namespace Tempocracy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecordController : ControllerBase
    {
        private readonly IGetUserRecordsHandler getUserRecordsHandler;
        private readonly ICreateRecordHandler createRecordHandler;

        public RecordController(
            IGetUserRecordsHandler getUserRecordsHandler,
            ICreateRecordHandler createRecordHandler)
        {
            this.getUserRecordsHandler = getUserRecordsHandler;
            this.createRecordHandler = createRecordHandler;
        }

        [HttpGet]
        public ActionResult<GetUserRecordsResult> Get([FromQuery]GetUserRecordsQuery query)
        {
            return getUserRecordsHandler.Ask(query);
        }
        
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            throw new NotImplementedException();
        }
        
        [HttpPost]
        public void Post([FromBody]CreateRecordCommand command)
        {
            createRecordHandler.Run(command);
        }
        
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
