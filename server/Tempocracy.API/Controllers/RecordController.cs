using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Swagger;
using Tempocracy.Domain.Commands.Records;
using Tempocracy.Domain.Exceptions;
using Tempocracy.Domain.Queries.Records;

namespace Tempocracy.API.Controllers
{
    [Route("api/record")]
    [ApiController]
    public class RecordController : ControllerBase
    {
        private readonly ICreateRecordHandler createRecordHandler;
        private readonly IUpdateRecordHandler updateRecordHandler;
        private readonly IGetUserRecordsHandler getUserRecordsHandler;
        private readonly IGetRecordHandler getRecordHandler;
        private readonly IDeleteRecordHandler deleteRecordHandler;
        

        public RecordController(
            IGetUserRecordsHandler getUserRecordsHandler,
            ICreateRecordHandler createRecordHandler, 
            IUpdateRecordHandler updateRecordHandler, 
            IGetRecordHandler getRecordHandler, 
            IDeleteRecordHandler deleteRecordHandler)
        {
            this.getUserRecordsHandler = getUserRecordsHandler;
            this.createRecordHandler = createRecordHandler;
            this.updateRecordHandler = updateRecordHandler;
            this.getRecordHandler = getRecordHandler;
            this.deleteRecordHandler = deleteRecordHandler;
        }

        [HttpGet]
        [Route("list")]
        public ActionResult<GetUserRecordsResult> Get([FromQuery]GetUserRecordsQuery query)
        {
            return HandleQuery(() => getUserRecordsHandler.Ask(query));
        }
        
        [HttpGet]
        public ActionResult<GetRecordResult> Get([FromQuery]GetRecordQuery query)
        {
            return HandleQuery(() => getRecordHandler.Ask(query));
        }
        
        [HttpPost]
        public IActionResult Post([FromBody]CreateRecordCommand command)
        {
            return HandleResult(() => createRecordHandler.Run(command));
        }
        
        [HttpPut]
        public IActionResult Put([FromBody]UpdateRecordCommand command)
        {
            return HandleResult(() => updateRecordHandler.Run(command));
        }

        [HttpDelete]
        public IActionResult Delete([FromBody]DeleteRecordCommand command)
        {
            return HandleResult(() => deleteRecordHandler.Run(command));
        }

        private ActionResult<T> HandleQuery<T>(Func<T> query)
        {
            try
            {
                var result = query();
                return Ok(result);
            }
            catch (RecordNotFoundException)
            {
                return NotFound();
            }
            catch (RecordAccessException)
            {
                return StatusCode((int)HttpStatusCode.Forbidden);
            }
        }

        private IActionResult HandleResult(Action command)
        {
            try
            {
                command();
                return Ok();
            }
            catch (RecordNotFoundException)
            {
                return NotFound();
            }
            catch (RecordAccessException)
            {
                return StatusCode((int)HttpStatusCode.Forbidden);
            }
        }
    }
}
