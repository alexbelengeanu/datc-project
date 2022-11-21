using Microsoft.WindowsAzure.Storage.Table;

namespace api
{
    public class LoginEntity : TableEntity
    {
        public LoginEntity(string email, string serie_buletin)
        {
            this.PartitionKey = email;
            this.RowKey = serie_buletin;
        }

        public LoginEntity() { }

        public string? Nume_complet { get; set; }

        public string? Varsta { get; set; }

        public string? Numar_telefon { get; set; }

        public string? Rol { get; set; }
    }
}