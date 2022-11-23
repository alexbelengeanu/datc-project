using System.Collections.Generic;
using System.Threading.Tasks;
using api;

namespace api{
    public interface ILoginTable
    {
        Task<List<LoginEntity>> GetAllUsers();

        Task<LoginEntity> GetUserById(string id);

        Task InsertUser(LoginEntity user);

        Task UpdateUser(LoginEntity user);

        Task DeleteUser(string id);
    }
}
