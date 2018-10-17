using System.Collections.Generic;

namespace CopaFilmes.Dominio.Entidades
{
    public class ChaveamentoPartidas : List<Partida>
    {
        public ChaveamentoPartidas(ChaveamentoPartidas chaveamentoAnterior = null)
        {
            this.ChaveamentoAnterior = chaveamentoAnterior;
        }

        public ChaveamentoPartidas ChaveamentoAnterior { get; }
    }
}