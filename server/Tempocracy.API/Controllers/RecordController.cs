using System;
using Microsoft.AspNetCore.Mvc;
using Tempocracy.Domain.Commands.Records;
using Tempocracy.Domain.Queries.Records;

namespace Tempocracy.API.Controllers
{
    [Route("record")]
    [ApiController]
    public class RecordController : ControllerBase
    {
        private readonly ICreateRecordHandler createRecordHandler;
        private readonly IUpdateRecordHandler updateRecordHandler;
        private readonly IGetUserRecordsHandler getUserRecordsHandler;
        private readonly IGetRecordHandler getRecordHandler;
        

        public RecordController(
            IGetUserRecordsHandler getUserRecordsHandler,
            ICreateRecordHandler createRecordHandler, 
            IUpdateRecordHandler updateRecordHandler, 
            IGetRecordHandler getRecordHandler)
        {
            this.getUserRecordsHandler = getUserRecordsHandler;
            this.createRecordHandler = createRecordHandler;
            this.updateRecordHandler = updateRecordHandler;
            this.getRecordHandler = getRecordHandler;
        }

        [HttpGet]
        [Route("list")]
        public ActionResult<GetUserRecordsResult> Get([FromQuery]GetUserRecordsQuery query)
        {
            return getUserRecordsHandler.Ask(query);
        }
        
        [HttpGet]
        public ActionResult<GetRecordResult> Get([FromQuery]GetRecordQuery query)
        {
            return getRecordHandler.Ask(query);
        }
        
        [HttpPost]
        public void Post([FromBody]CreateRecordCommand command)
        {
            createRecordHandler.Run(command);
        }
        
        [HttpPut]
        public void Put([FromBody]UpdateRecordCommand command)
        {
            updateRecordHandler.Run(command);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
