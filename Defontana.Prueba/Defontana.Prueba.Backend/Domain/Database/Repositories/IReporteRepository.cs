using Defontana.Prueba.Backend.Presentation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Defontana.Prueba.Backend.Domain.Database.Repositories
{
    public interface IReporteRepository
    {
        Task<List<ReporteDto>> getReportVentasFull(DateTime fechaInicio, DateTime fechaFinal);
    }
}
