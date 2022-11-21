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
    public class LoginTable : ILoginTable {
        private AzureTableSettings? _settings;
        private CloudStorageAccount? _storageAccount;
        private CloudTableClient? _tableClient;
        private CloudTable? _loginTable;

        public LoginTable()  
        {  
            //Settings
            _settings = new AzureTableSettings("", "", "");
            
            //Account  
            _storageAccount = new CloudStorageAccount(new StorageCredentials(_settings.StorageAccount, _settings.StorageKey), false);  
        
            //Client  
            _tableClient = _storageAccount.CreateCloudTableClient();  
        
            //Table  
            _loginTable = _tableClient.GetTableReference(_settings.TableName);
            Task.Run(async () => { await _loginTable.CreateIfNotExistsAsync(); }).GetAwaiter().GetResult();
        } 

        public async Task<LoginEntity> GetUserById(string id)
        {
            var ids = id.Split('-');
            var partitionKey = ids[0];
            var rowKey = ids[1];

            var query = TableOperation.Retrieve<LoginEntity>(partitionKey, rowKey);

            var result = await _loginTable.ExecuteAsync(query);

            return (LoginEntity)result.Result;
        }

        public async Task InsertUser(LoginEntity user)
        {
            var insertOperation = TableOperation.Insert(user);

            await _loginTable.ExecuteAsync(insertOperation);
        }

        public async Task DeleteUser(string id)
        {
            var ids = id.Split('-');
            var partitionKey = ids[0];
            var rowKey = ids[1];

            var entity = new DynamicTableEntity(partitionKey, rowKey) { ETag = "*" };

            await _loginTable.ExecuteAsync(TableOperation.Delete(entity));
        }

        public async Task UpdateUser(LoginEntity user)
        {
            user.ETag = "*";
            var editOperation = TableOperation.Merge(user);
            try
            {
                await _loginTable.ExecuteAsync(editOperation);
            }
            catch (StorageException e)
            {
                throw e;
            }
        }
    }
}
