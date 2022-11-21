using System.Collections.Generic;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;

namespace api {
    public class AlertsTable : IAlertsTable {
        private AzureTableSettings? _settings;
        private CloudStorageAccount? _storageAccount;
        private CloudTableClient? _tableClient;
        private CloudTable? _alertsTable;

        public AlertsTable()  
        {  
            //Settings
            _settings = new AzureTableSettings("", "", "");
            
            //Account  
            _storageAccount = new CloudStorageAccount(new StorageCredentials(_settings.StorageAccount, _settings.StorageKey), false);  
        
            //Client  
            _tableClient = _storageAccount.CreateCloudTableClient();  
        
            //Table  
            _alertsTable = _tableClient.GetTableReference(_settings.TableName);
            Task.Run(async () => { await _alertsTable.CreateIfNotExistsAsync(); }).GetAwaiter().GetResult();
        } 

        public async Task<List<AlertsEntity>> GetAllAlerts()
        {
            var alerts = new List<AlertsEntity>();

            TableQuery<AlertsEntity> query = new TableQuery<AlertsEntity>(); //.Where(TableQuery.GenerateFilterCondition("FirstName", QueryComparisons.Equal, "Istvan"));

            TableContinuationToken? token = null;
            do
            {
                TableQuerySegment<AlertsEntity> resultSegment = await _alertsTable.ExecuteQuerySegmentedAsync(query, token);
                token = resultSegment.ContinuationToken;

                alerts.AddRange(resultSegment.Results);

            } while (token != null);

            return alerts;
        }

        public async Task<AlertsEntity> GetAlertById(string id)
        {
            var ids = id.Split('-');
            var partitionKey = ids[0];
            var rowKey = ids[1];

            var query = TableOperation.Retrieve<AlertsEntity>(partitionKey, rowKey);

            var result = await _alertsTable.ExecuteAsync(query);

            return (AlertsEntity)result.Result;
        }

        public async Task InsertAlert(AlertsEntity alert)
        {
            var insertOperation = TableOperation.Insert(alert);

            await _alertsTable.ExecuteAsync(insertOperation);
        }

        public async Task DeleteAlert(string id)
        {
            var ids = id.Split('-');
            var partitionKey = ids[0];
            var rowKey = ids[1];

            var entity = new DynamicTableEntity(partitionKey, rowKey) { ETag = "*" };

            await _alertsTable.ExecuteAsync(TableOperation.Delete(entity));
        }

        public async Task UpdateAlert(AlertsEntity alert)
        {
            alert.ETag = "*";
            var editOperation = TableOperation.Merge(alert);
            try
            {
                await _alertsTable.ExecuteAsync(editOperation);
            }
            catch (StorageException e)
            {
                throw e;
            }
        }
    }
}
