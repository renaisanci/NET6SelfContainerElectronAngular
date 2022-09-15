using Microsoft.AspNetCore.Mvc;
using SmartSim.API.Models;
using System.Diagnostics;

namespace SmartSim.API.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return File("~/index.html", "text/html");
        }
    }
}