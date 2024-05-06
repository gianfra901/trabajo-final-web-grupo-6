using Dapper;
using TiendaVerde.Repository.Entities;
using TiendaVerde.Repository.Interfaces;

namespace TiendaVerde.Repository.Repositories;

public class ClienteRepository : IClienteRepository
{
    private readonly BaseRepository _baseRepository;
    public ClienteRepository(BaseRepository baseRepository)
    {
        _baseRepository = baseRepository;
    }
    public Cliente GetCliente(string correo, string contrasena)
    {
        var cliente = new Cliente();
        var dictionaryParams = new Dictionary<string, object>
        {
            { "@CORREO", correo },
            { "@CONTRASENA", contrasena }
        };
        DynamicParameters parameters = new DynamicParameters(dictionaryParams);
        using (var connection = _baseRepository.GetSqlConnection())
        {
            cliente = connection.Query<Cliente>(
                "SELECT C.IDCLIENTE, C.NOMBRES, C.APELLIDOS, C.DNI, C.DIRECCION, C.CORREO, C.CONTRASENA, ISNULL(P.IDPEDIDO,'') AS IDPEDIDO FROM CLIENTE C LEFT JOIN PEDIDO P ON C.IDCLIENTE = P.IDCLIENTE WHERE C.CORREO = @CORREO AND C.CONTRASENA = @CONTRASENA AND P.REALIZADO = 0", 
                parameters
               ).FirstOrDefault();
        }

        return cliente ?? new Cliente();
    }
}
