using CopaFilmes.Api.ViewModels;
using CopaFilmes.Dominio.Interfaces.Repositorios;
using CopaFilmes.Dominio.Interfaces.Servicos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CopaFilmes.Api.Controllers
{
    /// <summary>
    /// Consulta a listagem dos filmes disponíveis para participar do torneio
    /// e obtém a quantidade de filmes que precisa ser selecionada para gerar um torneio
    /// </summary>
    [Route("api/v1/[controller]s")]
    [ApiController]
    public class FilmeController: ControllerBase
    {
        private readonly IFilmeRepositorio _repositorio;
        private readonly IRegraQuantidadeParticipantes _regraQuantidadeParticipantes;
        public FilmeController(
            IFilmeRepositorio repositorio,
            IRegraQuantidadeParticipantes regraQuantidadeParticipantes)
        {
            _repositorio = repositorio;
            _regraQuantidadeParticipantes = regraQuantidadeParticipantes;
        }

        /// <summary>
        /// Consulta dos filmes disponíveis para participar do torneio
        /// </summary>
        /// <returns>Lista de filmes participantes</returns>
        [HttpGet]
        public async Task<ActionResult<FilmesDisponiveisViewModel>> GetFilmesAsync()
        {
            var filmes = await _repositorio.ListarFilmesAsync();
            return Ok(new FilmesDisponiveisViewModel
            {
                Filmes = filmes,
                QuantidadeMaximaParticipantes = _regraQuantidadeParticipantes.ObterQuantidadeMaxima()
            });
        }
    }
}