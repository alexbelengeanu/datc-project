using System.Collections.Generic;
using System.Threading.Tasks;
using datc_project.Function;

namespace datc_project.Function{
    public interface IAlertsTable
    {
        Task<AlertsEntity> GetAlertById(string partitionkey, string rowkey);
        Task InsertAlert(AlertsEntity student);
    }
}
