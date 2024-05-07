using TiendaVerde.Repository.Entities;

namespace TiendaVerde.Repository.Interfaces;

public interface IPedidoRepository
{
    public IEnumerable<PedidoDetalle> ObtenerPedido(string pedido);
    public string RegistrarPedido(Pedido pedido);
    public int ActualizarPedido(PedidoDetalleUpdate pedidoDetalleUpdate);
    public int ActualizarEstadoPedido(PedidoDetalleUpdateEstado pedidoDetalleUpdateEstado);
    public int EliminarPedido(string idPedido, string idProducto);
}
