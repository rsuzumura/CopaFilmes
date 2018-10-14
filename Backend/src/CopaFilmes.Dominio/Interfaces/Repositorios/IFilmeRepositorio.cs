using CopaFilmes.Dominio.Entidades;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CopaFilmes.Dominio.Interfaces.Repositorios
{
    public interface IFilmeRepositorio
    {
        Task<IEnumerable<Filme>> ListarFilmesAsync();
    }
}