using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TiendaVerde.Repository.Entities;
using TiendaVerde.Repository.Interfaces;

namespace TiendaVerde.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class PedidoController : ControllerBase
{
    private readonly IPedidoRepository _pedidoRepository;
    public PedidoController(IPedidoRepository pedidoRepository)
    {
        _pedidoRepository = pedidoRepository;
    }
    [HttpPost(Name = "GenerateToken")]
    public IResult Post(Pedido pedido)
    {
        var resp = _pedidoRepository.RegistrarPedido(pedido);
        return TypedResults.Created();
    }
}
