using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TiendaVerde.Repository.Interfaces;

namespace TiendaVerde.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductoController : ControllerBase
{
    private readonly IProductoRepository _productoRepository;
    private readonly IConfiguration _configuration;
    public ProductoController(IProductoRepository productoRepository, IConfiguration configuration)
    {
        _productoRepository = productoRepository;
        _configuration = configuration;

    }
    [HttpGet("")]
    [AllowAnonymous]
    public IResult Get()
    {
        var listaProductos = _productoRepository.ObtenerProductos();
        return TypedResults.Ok(listaProductos);
    }
    [HttpGet("{idProducto}")]
    [AllowAnonymous]
    public IResult GetProducto(string idProducto)
    {
        var listaProductos = _productoRepository.ObtenerDetalleProducto(idProducto);
        return TypedResults.Ok(listaProductos);
    }
    [HttpGet("items/{items}")]
    [AllowAnonymous]
    public IResult ObtenerProductosTopNItems(int items)
    {
        var listaProductos = _productoRepository.ObtenerProductosTopNItems(items);
        return TypedResults.Ok(listaProductos);
    }
    [HttpGet("categoria/{categoria}")]
    [AllowAnonymous]
    public IResult ObtenerProductosXCategoria(string categoria)
    {
        var listaProductos = _productoRepository.ObtenerProductosXCategoria(categoria);
        return TypedResults.Ok(listaProductos);
    }
}
