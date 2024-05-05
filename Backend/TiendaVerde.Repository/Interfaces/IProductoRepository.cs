using TiendaVerde.Repository.Entities;

namespace TiendaVerde.Repository.Interfaces;

public interface IProductoRepository
{
    public List<Producto> ObtenerProductos();
}
