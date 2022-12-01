using System.Collections.Generic;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;
using Azure.Messaging.ServiceBus;


namespace datc_project.Function {
    public class AlertsTable : IAlertsTable {
        private AzureTableSettings _settings;
        private CloudStorageAccount _storageAccount;
        private CloudTableClient _tableClient;
        private CloudTable _alertsTable;

        public AlertsTable()  
        { 
            //Settings
            _settings = new AzureTableSettings("datcproject", "EUnZwTKlqErqdeuMF/N8mfgEYmO3IubexgXpC/vCGSNmM4slSH7vYsHW2TNzTSWSGQ+SLAZm7uLT+AStI1fYKg==", "Alerts");
            
            //Account  
            _storageAccount = new CloudStorageAccount(new StorageCredentials(_settings.StorageAccount, _settings.StorageKey), false);  
        
            //Client  
            _tableClient = _storageAccount.CreateCloudTableClient();  
        
            //Table  
            _alertsTable = _tableClient.GetTableReference(_settings.TableName);
            Task.Run(async () => { await _alertsTable.CreateIfNotExistsAsync(); }).GetAwaiter().GetResult();
        } 

        public async Task<AlertsEntity> GetAlertById(string partitionKey, string rowKey)
        {
            var query = TableOperation.Retrieve<AlertsEntity>(partitionKey, rowKey);

            var result = await _alertsTable.ExecuteAsync(query);

            return (AlertsEntity)result.Result;
        }

        public async Task InsertAlert(AlertsEntity alert)
        {
            var insertOperation = TableOperation.Insert(alert);
            await _alertsTable.ExecuteAsync(insertOperation);
        }
    }
}
