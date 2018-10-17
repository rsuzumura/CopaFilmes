using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Interfaces.Servicos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CopaFilmes.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TorneioController : ControllerBase
    {
        private readonly IGeradorChaveamentoPartidas _geradorChaveamentoPartidas;
        private readonly ITorneio _torneio;
        private readonly IRegraVencedor _regraVencedor;

        public TorneioController(
            IGeradorChaveamentoPartidas geradorChaveamentoPartidas,
            ITorneio torneio,
            IRegraVencedor regraVencedor)
        {
            _geradorChaveamentoPartidas = geradorChaveamentoPartidas;
            _torneio = torneio;
            _regraVencedor = regraVencedor;
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Filme>>> DefinirVencedoresAsync([FromBody]Filme[] filmesParticipantes)
        {
            var chaveamentoInicial = _geradorChaveamentoPartidas.CriarChaveamento(filmesParticipantes);
            var chaveamentoFinal = _torneio.DisputarPartidas(chaveamentoInicial);
            var vencedores = _regraVencedor.Ranquear(chaveamentoFinal[0]);
            return await Task.FromResult(Ok(vencedores));
        }
    }
}