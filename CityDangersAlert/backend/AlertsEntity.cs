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

        public string? Coordonate_x { get; set; }

        public string? Coordonate_y { get; set; }

        public string? Descriere { get; set; }

        public string? Poza { get; set; }

        public string? Status { get; set; }
    }
}