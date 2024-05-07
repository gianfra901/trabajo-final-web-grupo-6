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
    public int EliminarPedido(string idPedido, string idProducto)
    {
        int resp = 0;
        var dictionaryParams = new Dictionary<string, object>
        {
            { "@IDPEDIDO",  idPedido },
            { "@IDPRODUCTO",  idProducto }
        };
        DynamicParameters parameters = new DynamicParameters(dictionaryParams);
        using (var connection = _baseRepository.GetSqlConnection())
        {
            resp = connection.Execute("ELIMINAR_PEDIDO", parameters, commandType: System.Data.CommandType.StoredProcedure);
        }
        return resp;
    }
    public int ActualizarPedido(PedidoDetalleUpdate pedidoDetalleUpdate)
    {
        int resp = 0;
        var dictionaryParams = new Dictionary<string, object>
        {
            { "@IDPEDIDO", pedidoDetalleUpdate.IdPedido },
            { "@IDPRODUCTO", pedidoDetalleUpdate.IdProducto },
            { "@CANTIDAD", pedidoDetalleUpdate.Cantidad }
        };
        DynamicParameters parameters = new DynamicParameters(dictionaryParams);
        using (var connection = _baseRepository.GetSqlConnection())
        {
            resp = connection.Execute("ACTUALIZAR_PEDIDO", parameters, commandType: System.Data.CommandType.StoredProcedure);
        }
        return resp;
    }

    public IEnumerable<PedidoDetalle> ObtenerPedido(string pedido)
    {
        IEnumerable<PedidoDetalle> pedidoDetalle;
        var dictionaryParams = new Dictionary<string, object>
        {
            { "@PEDIDO", pedido }
        };
        DynamicParameters parameters = new DynamicParameters(dictionaryParams);
        using (var connection = _baseRepository.GetSqlConnection())
        {
            pedidoDetalle = connection.Query<PedidoDetalle>("OBTENER_PEDIDO",
                parameters,
                commandType: System.Data.CommandType.StoredProcedure
               );
        }
        return pedidoDetalle ?? new List<PedidoDetalle>();
    }

    public string RegistrarPedido(Pedido pedido)
    {
        string resp = "";
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
            resp = connection.ExecuteScalar<string>("REGISTRAR_PEDIDO", parameters, commandType: System.Data.CommandType.StoredProcedure) ?? "";
        }
        return resp;
    }

    public int ActualizarEstadoPedido(PedidoDetalleUpdateEstado pedidoDetalleUpdateEstado)
    {
        int resp = 0;
        var dictionaryParams = new Dictionary<string, object>
        {
            { "@IDPEDIDO", pedidoDetalleUpdateEstado.IdPedido },
            { "@REALIZADO", pedidoDetalleUpdateEstado.Realizado }
        };
        DynamicParameters parameters = new DynamicParameters(dictionaryParams);
        using (var connection = _baseRepository.GetSqlConnection())
        {
            resp = connection.Execute("ACTUALIZAR_ESTADO_PEDIDO", parameters, commandType: System.Data.CommandType.StoredProcedure);
        }
        return resp;
    }
}
