using CopaFilmes.Dominio.Entidades;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CopaFilmes.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TorneioController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Filme>>> DefinirVencedores([FromBody]Torneio torneio)
        {
            var vencedores = torneio.DefinirVencedores();
            return await Task.FromResult(Ok(vencedores));
        }
    }
}