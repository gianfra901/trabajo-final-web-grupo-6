namespace TiendaVerde.Repository.Entities;

public class PedidoDetalle
{
    public string IdPedidoDetalle { get; set; } = string.Empty;
    public string IdPedido { get; set; } = string.Empty;
    public string IdProducto { get; set; } = string.Empty;
    public string NombreProducto { get; set; } = string.Empty;
    public double Cantidad { get; set; } = 0;
    public double Precio { get; set; } = 0;
    public double Total { get; set; } = 0;
}
public class PedidoDetalleUpdate {
    public string IdPedido { get; set; } = string.Empty;
    public string IdProducto { get; set; } = string.Empty;
    public double Cantidad { get; set; } = 0;
}
public class PedidoDetalleUpdateEstado
{
    public string IdPedido { get; set; } = string.Empty;
    public bool Realizado { get; set; } = false;
}