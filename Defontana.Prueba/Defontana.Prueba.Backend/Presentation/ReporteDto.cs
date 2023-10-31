using Defontana.Prueba.Backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Defontana.Prueba.Backend.Presentation
{
    public class ReporteDto
    {        
        public long idVenta{get;set;}
        public int total{get;set;}
        public DateTime fechaVenta{get;set;}
        public long idLocal{get;set;}
        public string nombreLocal{get;set;}
        public string nombreMarca { get; set; }
        public int cantidad{get;set;}
        public int costoUnitario{get;set;}
        public int precioUnitario{ get; set; }
        public string nombreProducto { get; set; }

        public int totalLinea { get;set;}
        
    }
}
