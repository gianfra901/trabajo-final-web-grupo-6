using Dapper;
using TiendaVerde.Repository.Entities;
using TiendaVerde.Repository.Interfaces;

namespace TiendaVerde.Repository.Repositories;

public class PedidoRepository: IPedidoRepository
{
    private readonly BaseRepository _baseRepository;
    public PedidoRepository(BaseRepository baseRepository)
    {
        _baseRepository = baseRepository;
    }

    public List<Pedido> ObtenerPedido()
    {
        throw new NotImplementedException();
    }

    public int RegistrarPedido(Pedido pedido)
    {
        int resp = 0;
        var dictionaryParams = new Dictionary<string, object>
        {
            { "@IDPEDIDO", pedido.IdPedido },
            { "@IDCLIENTE", pedido.IdCliente },
            { "@TOTALVENTA", pedido.TotalVenta },
            { "@REALIZADO", pedido.Realizado },
            { "@IDPRODUCTO", pedido.IdProducto },
            { "@CANTIDAD", pedido.Cantidad },
            { "@PRECIO", pedido.Precio }
        };
        DynamicParameters parameters = new DynamicParameters(dictionaryParams);
        using (var connection = _baseRepository.GetSqlConnection())
        {
            resp = connection.Execute("REGISTRAR_PEDIDO", parameters, commandType: System.Data.CommandType.StoredProcedure);
        }
        return resp;
    }
}
