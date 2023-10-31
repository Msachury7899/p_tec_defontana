using Defontana.Prueba.Backend.Domain;
using Defontana.Prueba.Backend.Domain.Database.Repositories;
using Defontana.Prueba.Backend.Infraestructure.Database.DbContexts;
using Defontana.Prueba.Backend.Infraestructure.Database.Repositories;
using Defontana.Prueba.Backend.Presentation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Logging;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

var database = new PruebaContext();
IReporteRepository reporteRepository = new ReporteRepository(database);
var factory = database.GetService<ILoggerFactory>();
factory.AddProvider(new MyLoggerProvider());
List<ReporteDto> reportes = await reporteRepository.getReportVentasFull(DateTime.Now.AddDays(-30), DateTime.Now);

var reporte1Query = reportes.DistinctBy(entity => entity.idVenta).Select( 
    venta =>
    new {
        idVenta = venta.idVenta,
        totalVenta = venta.total,
        local = venta.nombreLocal,        
        fecha = venta.fechaVenta,
        nombreMarca = venta.nombreMarca,        
        margenGanancia = (venta.precioUnitario * venta.cantidad) - (venta.costoUnitario * venta.cantidad)

    }
).ToList();

var cantidadVentas = reporte1Query.Count;
var montoTotal = reporte1Query.Sum(s => s.totalVenta);
var registroMasAlto = reporte1Query.OrderByDescending(entity => entity.totalVenta).First();
var productoTotalVenta = reportes.OrderByDescending(entity => entity.totalLinea).First();
var localMayorMontoVentas = reporte1Query.GroupBy(entity => entity.local).Select(
    group => new
    {
        local = group.Key,
        totalLocal  = group.Sum(e => e.totalVenta)
    }
).MaxBy(e => e.totalLocal);


var reporte2Query = reportes.Select(
    venta =>
    new {                
        nombreMarca = venta.nombreMarca,
        margenGanancia = (venta.precioUnitario * venta.cantidad) - (venta.costoUnitario * venta.cantidad)
    }
).ToList();


var marcaMayorMargenVentas = reporte2Query.GroupBy(entity => entity.nombreMarca).Select(
    group => new
    {                
        marca = group.Key,
        totalMarca = group.Sum(e => e.margenGanancia)
    }
).MaxBy(e => e.totalMarca);


//var localesMayoresProductosLista = reportes.GroupBy(p => new { p.nombreProducto, p.nombreLocal, p.cantidad }).Select(entity => new
//{
//    nombreLocal = entity.Key.nombreLocal,
//    nombreProducto = entity.Key.nombreProducto,
//    cantidad = entity.Sum(e => e.cantidad),

//}).OrderByDescending(x => x.cantidad).ToList();

//var resultado = localesMayoresProductosLista

//    .GroupBy(x => new { x.nombreProducto,x.nombreLocal})
//    .Select(group => group.First())
//    .OrderBy(x => x.nombreLocal)
//    .ToList();



Console.WriteLine($"-----------------------");

Console.WriteLine($"1 Cantidad Ventas: {cantidadVentas}; Monto Total {montoTotal}");
Console.WriteLine($"2 Venta Maxima: {registroMasAlto.totalVenta}; Fecha: {registroMasAlto.fecha.ToString("yyyy-MM-dd HH:mm:ss")}");
Console.WriteLine($"3 Producto Mayor Monto Total: {productoTotalVenta.nombreProducto}; Total: {productoTotalVenta.totalLinea}");
Console.WriteLine($"4 Local Mayor Ventas Total: {localMayorMontoVentas.local}; Total: {localMayorMontoVentas.totalLocal}");
Console.WriteLine($"5 Marca Mayor Margen: {marcaMayorMargenVentas.marca}; Valor Margen: {marcaMayorMargenVentas.totalMarca}");
Console.WriteLine($"6 ¿Cómo obtendrías cuál es el producto que más se vende en cada local?");


//• ¿Cuál es la marca con mayor margen de ganancias? El margen de ganancias de un producto
//está dado por (Cantidad vendida * Precio unitario) -(Cantidad vendida* Costo).
//• ¿Cómo obtendrías cuál es el producto que más se vende en cada local?

Console.WriteLine($"-----------------------");


Console.ReadLine();