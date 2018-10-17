using CopaFilmes.Dominio.Entidades;

namespace CopaFilmes.Dominio.Interfaces.Servicos
{
    public interface ITorneio
    {
        ChaveamentoPartidas DisputarPartidas(ChaveamentoPartidas chaveamentoAtual);
    }
}
