using Microsoft.AspNetCore.Mvc;
using SmartSim.API.Models;

namespace SmartSim.API.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class InstrumentsController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
                "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
            };

        private readonly ILogger<InstrumentsController> _logger;

        public InstrumentsController(ILogger<InstrumentsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Instrument> Get()
        {
            string[] WinMonitor = { "WinMonitor", "" };
            string[] HL7 = { "HL7", "" };
            string[] Cobas = { "COBAS", "" };

            return Enumerable.Range(1, 5).Select(index => new Instrument
            {

                Number = Guid.NewGuid(),
                InstrumentName = "Cobas" + Random.Shared.Next(100, 600).ToString(),
                ASTM = "ASTM",
                HL7 = Random.Shared.Next(HL7.Length - 1, HL7.Length).ToString(),
                Cobas = Random.Shared.Next(Cobas.Length - 1, Cobas.Length).ToString(),
                Poct1 = "POCT1-A",
                WinMonitor = Random.Shared.Next(WinMonitor.Length - 1, WinMonitor.Length).ToString()
            })
                .ToArray();
        }

    }
}
