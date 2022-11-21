using System.Collections.Generic;
using System.Threading.Tasks;
using api;

namespace api{
    public interface IAlertsTable
    {
        Task<List<AlertsEntity>> GetAllAlerts();

        Task<AlertsEntity> GetAlertById(string id);

        Task InsertAlert(AlertsEntity student);

        Task UpdateAlert(AlertsEntity student);

        Task DeleteAlert(string id);
    }
}
