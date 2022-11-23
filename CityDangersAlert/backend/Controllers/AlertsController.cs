using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlertsController : ControllerBase
    {
        
        private IAlertsTable _alertsTable;

        public AlertsController(IAlertsTable alertsTable)
        {
            _alertsTable = alertsTable;
        }

        [HttpGet("manage")]
        public string manage()
        {
            return "Manage alerts through this endpoint.";
        }

        [HttpGet("all")]
        public async Task<IEnumerable<AlertsEntity>> GetAllAlerts()
        {
            return await _alertsTable.GetAllAlerts();
        }

        [HttpGet("{id}")]
        public async Task<AlertsEntity> GetAlertById([FromRoute] string id)
        {
            return await _alertsTable.GetAlertById(id);
        }

        [HttpPost("insert")]
        public async Task Post([FromBody] AlertsEntity alert) {
            try
            {
                await _alertsTable.InsertAlert(alert);
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<string> Delete([FromRoute] string id)
        {
            try
            {
                await _alertsTable.DeleteAlert(id);

                return "Alerta a fost stearsa cu succes din baza de date.";
            }
            catch (System.Exception e)
            {
                return "Eroare: " + e.Message;
            }

        }

        [HttpPut("update")]
        public async Task<string> Update([FromBody] AlertsEntity alert) {
            try
            {
                await _alertsTable.UpdateAlert(alert);

                return "Datele alertei au fost modificate cu succes.";
            }
            catch (System.Exception e)
            {
                return "Eroare: " + e.Message;
            }
        }
    }
}