namespace TiendaVerde.Repository.Entities;

public class Data { 

    public List<Producto> Productos { get; set; }
}
public class Producto
{
    public string IdProducto { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
    public string IdCategoria { get; set; } = string.Empty;
    public double Precio { get; set; }
    public double Stock { get; set; }
}
