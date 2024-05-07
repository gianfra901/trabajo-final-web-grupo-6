using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TiendaVerde.Repository.Entities;
using TiendaVerde.Repository.Interfaces;

namespace TiendaVerde.IdentityServer.Controllers;

[Route("api/[Controller]")]
[ApiController]
public class TokenController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IClienteRepository _clienteRepository;
    public TokenController(IConfiguration configuration, IClienteRepository clienteRepository)
    {
        _configuration = configuration;
        _clienteRepository = clienteRepository;
    }
    [HttpPost(Name = "RegistrarCliente")]
    public IResult Post(DatosCliente datosCliente)
    {
        var cliente = _clienteRepository.RegistrarCliente(datosCliente);
        return TypedResults.Ok(cliente);
    }
    [HttpGet(Name = "GenerateToken")]
    public IResult Get(string correo, string contrasena)
    {
        var cliente = _clienteRepository.GetCliente(correo, contrasena);
        if (cliente.Nombres is null) 
        {
            return TypedResults.BadRequest(new 
            {
                ErrorMessage = "Correo o contrasena incorrectos.",
            });
        }
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["IdentityServer:SecretKey"]!.ToString());
        
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("exp", DateTimeOffset.UtcNow.AddHours(1).ToUnixTimeSeconds().ToString()),
                new Claim("uid", new Guid().ToString()),
                new Claim("idcliente", cliente.IdCliente),
                new Claim("nombres", cliente.Nombres),
                new Claim("apellidos", cliente.Apellidos),
                new Claim("correo", cliente.Correo)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            Audience = _configuration["IdentityServer:TiendaVerdeAud"]!.ToString(),
            Issuer = _configuration["IdentityServer:TiendaVerdeIss"]!.ToString(),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);
        return TypedResults.Ok(new
        {
            IdCliente = cliente.IdCliente,
            Nombres = cliente.Nombres,
            Apellidos = cliente.Apellidos,
            Dni = cliente.DNI,
            Direccion = cliente.Direccion,
            Correo = cliente.Correo,
            Telefono = cliente.Telefono,
            IdPedido = cliente.IdPedido,
            Token = tokenString
        });
    }
}