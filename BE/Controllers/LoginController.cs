using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MobileServices.Common;

namespace MobileServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly RDSContext _context;

        public LoginController(ILogger<LoginController> logger, RDSContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        public bool Login(string user, string password)
        {
            _logger.LogInformation("Loggin success");
            return true;
        }
    }
}