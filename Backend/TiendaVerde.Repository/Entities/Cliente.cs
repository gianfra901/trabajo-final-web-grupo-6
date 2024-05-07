namespace TiendaVerde.Repository.Entities;

public class Cliente
{
    public string IdCliente { get; set; }
    public string Nombres { get; set; }
    public string Apellidos { get; set; }
    public string DNI { get; set; }
    public string Direccion { get; set; }
    public string Correo { get; set; }
    public string Telefono { get; set; }
    public string IdPedido { get; set; }
}
