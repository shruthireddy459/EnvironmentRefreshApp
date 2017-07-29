using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EnvironmentRefreshApp.Models;


namespace EnvironmentRefreshApp.Controllers
{
    [Route("api/[controller]")]
    public class RefreshRequestController : Controller
    {
        private readonly EnvironmentRefreshContext _context;

        public RefreshRequestController(EnvironmentRefreshContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<RefreshRequestModel> Get()
        {
            return _context.RefreshRequests.Include(x => x.Databases);
        }

        // GET: api/values
        [HttpGet("{id}", Name = "GetRefreshRequest")]
        public RefreshRequestModel Get(string id)
        {
            return _context.RefreshRequests
                .Include(x => x.Databases)
                .Include(x => x.Logs)
                .SingleOrDefault(x => x.Id == id);
        }

        // POST: api/RefreshRequest
        [HttpPost]
        public string Post([FromBody] RefreshRequestModel request)
        {
            try
            {
                var startTime = DateTime.Now.AddMinutes(-12);
                RefreshRequestModel refreshRequestModel = new RefreshRequestModel();
                refreshRequestModel.Id = System.Guid.NewGuid().ToString();
                refreshRequestModel.Environment = request.Environment;
                refreshRequestModel.Status = request.Status;
                refreshRequestModel.Requestor = request.Requestor;
                //refreshRequestModel.ScheduleDate = startTime;
                //refreshRequestModel.CompletionDate = startTime.AddMinutes(2);
                refreshRequestModel.ScheduleDate = request.ScheduleDate;
                refreshRequestModel.CompletionDate = request.CompletionDate;

                foreach (DatabaseLogModel databaseItem in request.Databases)
                {
                    databaseItem.RestoreStartTime = startTime;
                    databaseItem.StageCompleteTime = startTime.AddMinutes(2);
                    databaseItem.RestoreCompleteTime = startTime.AddMinutes(5);
                    databaseItem.ElapsedTime = "00:00:27.0480000";
                    databaseItem.Duration = "27 seconds and 48ms";
                    databaseItem.Resource = "http://localhost/api/EnvironmentRefreshConfigurations/MAIN/Customers";
                }
                refreshRequestModel.Databases = request.Databases;

                if (refreshRequestModel != null)
                {
                    _context.RefreshRequests.Add(refreshRequestModel);
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = 400;
                return ex.ToString();
            }
            return "OK";
        }
    }
}
