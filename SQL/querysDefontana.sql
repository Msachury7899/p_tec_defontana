




-- 1. El total de ventas de los últimos 30 días (monto total y cantidad total de ventas).
SELECT SUM(total) as monto_total,COUNT(*) as cantidad_ventas FROM Venta v
WHERE ([v].[Fecha] >=  '2023-09-30 00:00:00') AND ([v].[Fecha] <= '2023-10-30 23:59:59')

-- 2 El Dia y hora en que se realizo la venta con el monto mas alto ( y cual es aquel monto).
SELECT TOP 1 total as monto, fecha FROM Venta v
WHERE ([v].[Fecha] >=  '2023-09-30 00:00:00') AND ([v].[Fecha] <= '2023-10-30 23:59:59')
ORDER BY total DESC
-- 3 Indicar cuál es el producto con mayor monto total de ventas. El total de ventas de un producto
-- se encuentra en la tabla VentaDetalle columna TotalLinea.
SELECT TOP 1 pr.Nombre,vd.TotalLinea
FROM Venta v 
INNER JOIN VentaDetalle vd ON v.ID_Venta = vd.ID_Venta
INNER JOIN Producto pr ON vd.ID_Producto = pr.ID_Producto
WHERE ([v].[Fecha] >=  '2023-09-30 00:00:00') AND ([v].[Fecha] <= '2023-10-30 23:59:59')
ORDER BY TotalLinea DESC


-- 4 Indicar el local con mayor monto de ventas.
SELECT TOP 1 SUM(t.total) as total_local,t.id_local,t.nombre_local  FROM (SELECT 
Distinct v.ID_Venta
,loc.ID_Local as [id_local]
,loc.Nombre as [nombre_local]
,v.Total as [total]
FROM Venta v 
INNER JOIN VentaDetalle vd ON v.ID_Venta = vd.ID_Venta
INNER JOIN [Local] loc ON v.ID_Local = loc.ID_Local
WHERE (Fecha >= '2023-09-30 00:00:00' AND Fecha <= '2023-10-30 23:59:59')
) AS t
GROUP BY t. [id_local],t.[nombre_local]
ORDER BY total_local DESC


-- 5. ¿Cuál es la marca con mayor margen de ganancias? El margen de ganancias de un producto
-- está dado por (Cantidad vendida * Precio unitario) - (Cantidad vendida * Costo).
SELECT TOP 1 SUM((vd.Cantidad * vd.Precio_Unitario) - (vd.Cantidad*pr.Costo_Unitario)) margen_ganancia
	, marc.Nombre
FROM Venta v 
INNER JOIN VentaDetalle vd ON v.ID_Venta = vd.ID_Venta
INNER JOIN Producto pr ON vd.ID_Producto = pr.ID_Producto
INNER JOIN Marca marc ON pr.ID_Marca = marc.ID_Marca
WHERE (Fecha >= '2023-09-30 00:00:00' AND Fecha <= '2023-10-30 23:59:59')
GROUP BY marc.Nombre
ORDER BY margen_ganancia DESC


-- 6. ¿Cómo obtendrías cuál es el producto que más se vende en cada local?


WITH VentasConMaxCantidad AS (
    SELECT
        pr.Nombre,
        loc.Nombre AS [nombre_local],
        SUM(Cantidad) AS cantidad_vendidos,
        ROW_NUMBER() OVER (PARTITION BY loc.ID_Local ORDER BY SUM(Cantidad) DESC) AS RowNum
    FROM Venta v
    INNER JOIN VentaDetalle vd ON v.ID_Venta = vd.ID_Venta
    INNER JOIN Producto pr ON vd.ID_Producto = pr.ID_Producto
    INNER JOIN [Local] loc ON v.ID_Local = loc.ID_Local
    WHERE (Fecha >= '2023-09-30 00:00:00' AND Fecha <= '2023-10-30 23:59:59')
    GROUP BY pr.Nombre, loc.Nombre, loc.ID_Local
)

SELECT
    Nombre,
    [nombre_local],
    cantidad_vendidos
FROM VentasConMaxCantidad
WHERE RowNum = 1;


