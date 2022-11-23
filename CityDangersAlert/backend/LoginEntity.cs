using Microsoft.WindowsAzure.Storage.Table;

namespace api
{
    public class LoginEntity : TableEntity
    {
        public LoginEntity(string username, string parola)
        {
            this.PartitionKey = username;
            this.RowKey = parola;
        }

        public LoginEntity() { }

        public string? Nume { get; set; }

        public string? Varsta { get; set; }

        public string? Email { get; set; }

        public string? Rol { get; set; }
    }
}