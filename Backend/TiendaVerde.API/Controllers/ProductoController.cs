using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TiendaVerde.Repository.Interfaces;

namespace TiendaVerde.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ProductoController : ControllerBase
{
    private readonly IProductoRepository _productoRepository;
    private readonly IConfiguration _configuration;
    public ProductoController(IProductoRepository productoRepository, IConfiguration configuration)
    {
        _productoRepository = productoRepository;
        _configuration = configuration;

    }
    [HttpGet(Name = "GetProducto")]
    //[AllowAnonymous]
    public IResult Get()
    {
        var listaProductos = _productoRepository.ObtenerProductos();
        return TypedResults.Ok(listaProductos);
    }
}
