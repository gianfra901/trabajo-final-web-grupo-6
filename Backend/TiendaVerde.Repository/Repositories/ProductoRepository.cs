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
    public List<Producto> ObtenerProductos()
    {
        var returnList = new List<Producto>();
        using (var connection = _baseRepository.GetSqlConnection())
        {
            returnList = connection.Query<Producto>("SELECT * FROM PRODUCTO", commandType: System.Data.CommandType.Text).ToList();
        }
        return returnList;
    }
}
