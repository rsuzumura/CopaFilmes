using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Interfaces.Servicos;

namespace CopaFilmes.Dominio.Servicos
{
    public class TorneioMataMata : ITorneio
    {
        private readonly IRegraVencedor _regraVencedor;
        public TorneioMataMata(IRegraVencedor regraVencedor)
        {
            _regraVencedor = regraVencedor;
        }

        public ChaveamentoPartidas DisputarPartidas(ChaveamentoPartidas chaveamentoAtual)
        {
            if (chaveamentoAtual.Count == 1)
                return chaveamentoAtual;
            else
            {
                var proximoChaveamento = new ChaveamentoPartidas(chaveamentoAtual);
                for (int i = 0; i < chaveamentoAtual.Count; i+= 2)
                {
                    var vencedorA = _regraVencedor.Ranquear(chaveamentoAtual[i])[0];
                    var vencedorB = _regraVencedor.Ranquear(chaveamentoAtual[i + 1])[0];
                    proximoChaveamento.Add(new Partida(vencedorA, vencedorB));
                }
                return DisputarPartidas(proximoChaveamento);
            }
        }
    }
}