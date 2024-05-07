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
                "SELECT * FROM PRODUCTO WHERE IDPRODUCTO=@IDPRODUCTO",
                parameters).FirstOrDefault();
        }
        return producto ?? new Producto();
    }

    public List<Producto> ObtenerProductos()
    {
        var returnList = new List<Producto>();
        using (var connection = _baseRepository.GetSqlConnection())
        {
            returnList = connection.Query<Producto>("SELECT * FROM PRODUCTO", commandType: System.Data.CommandType.Text).ToList();
        }
        return returnList;
    }

    public List<Producto> ObtenerProductosTopNItems(int items)
    {
        var returnList = new List<Producto>();
        using (var connection = _baseRepository.GetSqlConnection())
        {
            returnList = connection.Query<Producto>($"SELECT TOP {items} * FROM PRODUCTO ORDER BY NEWID()", commandType: System.Data.CommandType.Text).ToList();
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
            returnList = connection.Query<Producto>("SELECT * FROM PRODUCTO WHERE IDCATEGORIA=@CATEGORIA", parameters).ToList();
        }
        return returnList;
    }
}
