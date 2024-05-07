﻿using Dapper;
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
                "VALIDAR_CLIENTE",
                parameters,
                commandType: System.Data.CommandType.StoredProcedure
               ).FirstOrDefault();
        }

        return cliente ?? new Cliente();
    }
}
