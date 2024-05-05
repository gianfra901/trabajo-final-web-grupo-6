using TiendaVerde.Repository.Entities;

namespace TiendaVerde.Repository.Interfaces;

public interface IClienteRepository
{
    public Cliente GetCliente(string correo, string contrasena);
}
