using TiendaVerde.Repository.Entities;

namespace TiendaVerde.Repository.Interfaces;

public interface IProductoRepository
{
    public List<Producto> ObtenerProductos();
    public Producto ObtenerDetalleProducto(string idProducto);
    public List<Producto> ObtenerProductosTopNItems(int items);
    public List<Producto> ObtenerProductosXCategoria(string categoria);
}
