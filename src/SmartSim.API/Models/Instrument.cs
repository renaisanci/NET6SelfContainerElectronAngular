namespace SmartSim.API.Models
{
    public class Instrument
    {


        public Guid Number { get; set; }
        public string? InstrumentName { get; set; }
        public string? ASTM { get; set; }
        public string? HL7 { get; set; }
        public string? Cobas { get; set; }
        public string Poct1 { get; set; }
        public string? WinMonitor { get; set; }
    }
}
