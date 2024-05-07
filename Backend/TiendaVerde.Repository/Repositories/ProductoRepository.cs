using Dapper;
using TiendaVerde.Repository.Entities;
using TiendaVerde.Repository.Interfaces;

namespace TiendaVerde.Repository.Repositories;

public class ProductoRepository : IProductoRepository
{
    private readonly BaseRepository _baseRepository;
    public ProductoRepository(BaseRepository baseRepository)
    {
        _baseRepository = baseRepository;
    }

    public Producto ObtenerDetalleProducto(string idProducto)
    {
        var dictionaryParams = new Dictionary<string, object>
        {
            { "@IDPRODUCTO", idProducto }
        };
        DynamicParameters parameters = new DynamicParameters(dictionaryParams);
        var producto = new Producto();
        using (var connection = _baseRepository.GetSqlConnection())
        {
            producto = connection.Query<Producto>(
                "OBTENER_DETALLE_PRODUCTO",
                parameters).FirstOrDefault();
        }
        return producto ?? new Producto();
    }

    public List<Producto> ObtenerProductos()
    {
        var returnList = new List<Producto>();
        using (var connection = _baseRepository.GetSqlConnection())
        {
            returnList = connection.Query<Producto>("OBTENER_PRODUCTOS_DESTACADOS", commandType: System.Data.CommandType.StoredProcedure).ToList();
        }
        return returnList;
    }

    public List<Producto> ObtenerProductosTopNItems(int items)
    {
        var dictionaryParams = new Dictionary<string, object>
        {
            { "@ITEMS", items }
        };
        DynamicParameters parameters = new DynamicParameters(dictionaryParams);
        var returnList = new List<Producto>();
        using (var connection = _baseRepository.GetSqlConnection())
        {
            returnList = connection.Query<Producto>("OBTENER_PRODUCTOS_N_TOP_ITEMS", parameters).ToList();
        }
        return returnList;
    }

    public List<Producto> ObtenerProductosXCategoria(string categoria)
    {
        var dictionaryParams = new Dictionary<string, object>
        {
            { "@CATEGORIA", categoria }
        };
        DynamicParameters parameters = new DynamicParameters(dictionaryParams);
        var returnList = new List<Producto>();
        using (var connection = _baseRepository.GetSqlConnection())
        {
            returnList = connection.Query<Producto>("OBTENER_PRODUCTOS_X_CATEGORIA", parameters).ToList();
        }
        return returnList;
    }
}
