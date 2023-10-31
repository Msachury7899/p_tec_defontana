using Defontana.Prueba.Backend.Domain.Database.Repositories;
using Defontana.Prueba.Backend.Domain.Entities;
using Defontana.Prueba.Backend.Infraestructure.Database.DbContexts;
using Defontana.Prueba.Backend.Presentation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Defontana.Prueba.Backend.Infraestructure.Database.Repositories
{
    public class ReporteRepository: IReporteRepository
    {

        private readonly PruebaContext context;
        public ReporteRepository(PruebaContext context )
        {
            this.context = context;
        }

        public async Task<List<ReporteDto>> getReportVentasFull(DateTime fechaInicio, DateTime fechaFinal)
        {

            DateTime formatDatetimeInicio = DateTime.Parse(fechaInicio.ToString("yyyy-MM-dd 00:00:00"));
            DateTime formatDatetimeFinal  = DateTime.Parse(fechaFinal.ToString("yyyy-MM-dd 23:59:59"));            
            //var query = (
            //    from clientLocationLob in context.ClientLocationLobs
            //    join lobs in context.Lobs on clientLocationLob.LobId equals lobs.LobId
            //    join userLob in context.UserLobs on lobs.LobId equals userLob.LobId
            //    join users in context.Users on userLob.UserEmailAddress equals users.UserEmailAddress
            //    where clientLocationLob.ClientLocationId == clientLocationId
            //    select new GetUsersPaginateResponse
            //    {
            //        UserId = users.UserId,
            //        UserFirstName = users.UserFirstName,
            //        UserLastName = users.UserLastName,
            //        UserName = users.UserName,
            //        UserEmailAddress = users.UserEmailAddress,
            //        LocationId = users.LocationId,
            //        UserCCMS = users.UserCcms,
            //        RoleName = (
            //            from user_roles in context.UserRoles
            //            join rol in context.Roles on user_roles.RoleTpCode equals rol.RoleTpCode
            //            where user_roles.UserEmailAddress == users.UserEmailAddress
            //            select rol.RoleName
            //        ).First(),
            //        RoleTpCode = (
            //            from user_roles in context.UserRoles
            //            where user_roles.UserEmailAddress == users.UserEmailAddress
            //            select user_roles.RoleTpCode
            //        ).First(),
            //        StatusTpCode = (
            //            from user_audit in context.UserAudits
            //            where user_audit.UserEmailAddress == users.UserEmailAddress
            //            join audit in context.Audits on user_audit.AuditId equals audit.AuditId
            //            orderby user_audit.UserAuditId descending
            //            select audit.StatusTpCode
            //        ).First(),

            //        //StatusTpCode = users.StatusTpCode
            //    }
            //)
            //.Where(e => e.UserCCMS.Contains(filters.UserCCMS) || filters.UserCCMS == null)
            //.Distinct();
            //            INNER JOIN VentaDetalle vd ON v.ID_Venta = vd.ID_VentaDetalle
            //INNER JOIN Producto pr ON vd.ID_Producto = pr.ID_Producto
            //INNER JOIN Marca mar ON pr.ID_Marca = mar.ID_Marca
            //INNER JOIN[Local] loc ON v.ID_Local = loc.ID_Local
            var response = await (
                from ventas in context.Venta
                join vd  in context.VentaDetalles on ventas.IdVenta equals vd.IdVenta
                join pr  in context.Productos     on vd.IdProducto  equals pr.IdProducto
                join mar in context.Marcas        on pr.IdMarca  equals mar.IdMarca
                join loc in context.Locals        on ventas.IdLocal equals loc.IdLocal
                select new ReporteDto
                {
                    idVenta = ventas.IdVenta,
                    total = ventas.Total,
                    fechaVenta = ventas.Fecha,
                    idLocal = loc.IdLocal,
                    nombreLocal = loc.Nombre,
                    cantidad  = vd.Cantidad,
                    costoUnitario = pr.CostoUnitario,
                    precioUnitario = vd.PrecioUnitario,
                    nombreProducto = pr.Nombre,
                    totalLinea = vd.TotalLinea,
                    nombreMarca = mar.Nombre
                }
                
            ).Where(entity => entity.fechaVenta >= formatDatetimeInicio && entity.fechaVenta <= formatDatetimeFinal)
            .ToListAsync();

            return response;
        }
    }
}
