using CopaFilmes.Dominio.Entidades;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CopaFilmes.Api.Controllers
{
    [Route("api/v1/[controller]s")]
    [ApiController]
    public class FilmeController: ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Filme>>> GetFilmesAsync()
        {
            return new[]
            {
                new Filme(),
                new Filme(),
                new Filme(),
                new Filme()
            };
        }
    }
}