using TiendaVerde.Repository.Entities;

namespace TiendaVerde.Repository.Interfaces;

public interface IClienteRepository
{
    public int RegistrarCliente(DatosCliente datosCliente);
    public Cliente GetCliente(string correo, string contrasena);
}
