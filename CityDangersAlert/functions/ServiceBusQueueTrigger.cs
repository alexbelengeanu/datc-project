using System;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Table;

namespace datc_project.Function
{
    public class ServiceBusQueueTrigger
    {
        [FunctionName("ServiceBusQueueTrigger")]
        public async Task Run([ServiceBusTrigger("alerts", Connection = "datcprojectmq_SERVICEBUS")]string myQueueItem, ILogger log)
        {
            AlertsTable _alertsTable = new AlertsTable();

            log.LogInformation($"C# ServiceBus queue trigger function processed message: {myQueueItem}");
            var info = myQueueItem.Split('-');

            var result = await _alertsTable.GetAlertById(info[0], info[1]);

            if(result == null){
                AlertsEntity alert = new AlertsEntity(info[0], info[1]);
                alert.ETag = info[2];
                alert.Timestamp = DateTimeOffset.Parse(info[3]);
                alert.Descriere = info[4];
                alert.Status = info[5];
                try
                {
                    await _alertsTable.InsertAlert(alert);
                }
                catch (System.Exception)
                {
                    throw;
                }
                log.LogInformation("Alerta a fost inserata cu succes!");
            }
            else
                log.LogInformation("Alerta a fost identificata ca fiind un duplicat. Nu s-a efectuat inserarea.");
        }
    }
}
