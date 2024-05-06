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
    [HttpPost(Name = "GeneratePedido")]
    public IResult Post(Pedido pedido)
    {
        var resp = _pedidoRepository.RegistrarPedido(pedido);
        return TypedResults.Ok(resp);
    }
    [HttpPut(Name = "ActualizarPedido")]
    public IResult Put(PedidoDetalleUpdate pedidoDetalleUpdate)
    {
        var resp = _pedidoRepository.ActualizarPedido(pedidoDetalleUpdate);
        return TypedResults.Ok(resp);
    }
    [HttpDelete(Name = "EliminarPedido")]
    public IResult Delete(string idPedido, string idProducto)
    {
        var resp = _pedidoRepository.EliminarPedido(idPedido, idProducto);
        return TypedResults.Ok(resp);
    }
    [HttpGet(Name = "ObtenerPedido")]
    public IResult Get(string pedido)
    {
        var resp = _pedidoRepository.ObtenerPedido(pedido);
        return TypedResults.Ok(resp);
    }
    [HttpPatch(Name = "ActualizarEstadoPedido")]
    public IResult Patch(PedidoDetalleUpdateEstado pedidoDetalleUpdateEstado)
    {
        var resp = _pedidoRepository.ActualizarEstadoPedido(pedidoDetalleUpdateEstado);
        return TypedResults.Ok(resp);
    }
}
