using Microsoft.WindowsAzure.Storage.Table;

namespace api
{
    public class AlertsEntity : TableEntity
    {
        public AlertsEntity(string adresa, string tip_problema)
        {
            this.PartitionKey = adresa;
            this.RowKey = tip_problema;
        }

        public AlertsEntity() { }

        public string? coordonate_x { get; set; }

        public string? coordonate_y { get; set; }

        public string? descriere { get; set; }

        public string? poza { get; set; }
    }
}