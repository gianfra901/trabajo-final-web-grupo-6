using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace TiendaVerde.Repository;

public class BaseRepository
{
    private readonly IConfiguration _configuration;
    public BaseRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public SqlConnection GetSqlConnection(bool open = true)
    {
        string cs = _configuration.GetConnectionString("DefaultConnection")!;
        var csb = new SqlConnectionStringBuilder(cs) { };
        var conn = new SqlConnection(csb.ConnectionString);
        if (open) conn.Open();
        return conn;
    }
}
