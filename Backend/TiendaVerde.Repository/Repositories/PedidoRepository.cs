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
}
