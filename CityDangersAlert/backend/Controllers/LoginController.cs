using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        
        private ILoginTable _loginTable;

        public LoginController(ILoginTable loginTable)
        {
            _loginTable = loginTable;
        }

        [HttpGet("signin")]
        public string signin()
        {
            return "Welcome to our login page.";
        }

        [HttpGet("signup")]
        public string signup()
        {
            return "Welcome to our register page.";
        }

        [HttpGet("home")]
        public string home()
        {
            return "Welcome to our homepage.";
        }

        [HttpGet("manage")]
        public string manage()
        {
            return "Manage user's data through this endpoint.";
        }

        [HttpGet("all")]
        public async Task<IEnumerable<LoginEntity>> GetAllUsers()
        {
            return await _loginTable.GetAllUsers();
        }

        [HttpGet("{id}")]
        public async Task<LoginEntity> GetUserById([FromRoute] string id)
        {
            return await _loginTable.GetUserById(id);
        }

        [HttpPost("insert")]
        public async Task Post([FromBody] LoginEntity user) {
            try
            {
                await _loginTable.InsertUser(user);
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<string> Delete([FromRoute] string id)
        {
            try
            {
                await _loginTable.DeleteUser(id);

                return "Utilizatorul a fost sters cu succes.";
            }
            catch (System.Exception e)
            {
                return "Eroare: " + e.Message;
            }

        }

        [HttpPut("update")]
        public async Task<string> Update([FromBody] LoginEntity user) {
            try
            {
                await _loginTable.UpdateUser(user);

                return "Datele utilizatorului au fost modificate cu succes.";
            }
            catch (System.Exception e)
            {
                return "Eroare: " + e.Message;
            }
        }
    }
}