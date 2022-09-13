using Microsoft.AspNetCore.Mvc;

namespace netcore.Controllers;

[ApiController]
[Route("[controller]")]
public class InstrumentsController : ControllerBase
{

    private readonly ILogger<InstrumentsController> _logger;

    public InstrumentsController(ILogger<InstrumentsController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetInstruments")]
    public IEnumerable<dynamic> Get()
    {
        return new List<dynamic> {
            new
            {

                Number =  "1",
                Instrument= "Cobas",
                ASTM="ASTM",
                HL7 = "HL7",
                Cobas = "Cobas",
                Poct1 ="POCT1-A",
                WinMonitor ="WinMonitor"
            },
            new {

                Number =  "2",
                Instrument= "Cobas 480",
                ASTM="ASTM",
                HL7 = "HL7",
                Cobas = "Cobas",
                Poct1 ="POCT1-A",
                WinMonitor ="WinMonitor"
            },
            new {

                Number =  "3",
                Instrument= "Cobas 5003",
                ASTM="ASTM",
                HL7 = "HL7",
                Cobas = "Cobas",
                Poct1 ="POCT1-A",
                WinMonitor ="WinMonitor"
            },
            new {

                Number =  "4",
                Instrument= "Cobas 5089",
                ASTM="ASTM",
                HL7 = "HL7",
                Cobas = "Cobas",
                Poct1 ="POCT1-A",
                WinMonitor ="WinMonitor"
            },
            new {

                Number =  "",
                Instrument= "Cobas 405",
                ASTM="ASTM",
                HL7 = "HL7",
                Cobas = "Cobas",
                Poct1 ="POCT1-A",
                WinMonitor ="WinMonitor"
            }
        }.ToArray();
    }
}
