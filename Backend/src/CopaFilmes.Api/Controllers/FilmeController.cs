using CopaFilmes.Api.ViewModels;
using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Interfaces.Repositorios;
using CopaFilmes.Dominio.Interfaces.Servicos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CopaFilmes.Api.Controllers
{
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Filme>>> GetFilmesAsync()
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