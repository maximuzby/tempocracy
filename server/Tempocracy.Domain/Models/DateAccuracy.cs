namespace Tempocracy.Domain.Models
{
    public enum DateAccuracy
    {
        Abstract = 0,
        Year,
        Season,
        Month,
        Week,
        Day,
        DayPeriod,
        Hour,
        Minute,
        Second
    }
}
