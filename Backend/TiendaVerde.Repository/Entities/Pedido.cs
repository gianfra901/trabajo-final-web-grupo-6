﻿namespace TiendaVerde.Repository.Entities;

public class Pedido
{
    public string IdPedido { get; set; } = string.Empty;
    public string IdCliente { get; set; } = string.Empty;
    public double TotalVenta { get; set; } = 0;
    public bool Realizado { get; set; } = false;
    public string IdProducto { get; set; } = string.Empty;
    public double Cantidad { get; set; } = 0;
    public double Precio { get; set; } = 0;
}