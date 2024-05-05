using TiendaVerde.Repository.Entities;

namespace TiendaVerde.Repository.Interfaces;

public interface IPedidoRepository
{
    public List<Pedido> ObtenerPedido();
    public int RegistrarPedido(Pedido pedido);
}
