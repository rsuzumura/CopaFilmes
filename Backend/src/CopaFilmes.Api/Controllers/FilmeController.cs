using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Interfaces.Repositorios;
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
        public FilmeController(IFilmeRepositorio repositorio)
        {
            _repositorio = repositorio;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Filme>>> GetFilmesAsync()
        {
            var filmes = await _repositorio.ListarFilmesAsync();
            return Ok(filmes);
        }
    }
}