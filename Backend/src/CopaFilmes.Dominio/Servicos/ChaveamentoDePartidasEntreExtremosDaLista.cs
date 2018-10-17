using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Interfaces.Servicos;
using System;
using System.Linq;

namespace CopaFilmes.Dominio.Servicos
{
    public class ChaveamentoDePartidasEntreExtremosDaLista : IGeradorChaveamentoPartidas
    {
        public ChaveamentoPartidas CriarChaveamento(Filme[] filmes)
        {
            if (filmes?.Length % 2 != 0)
                throw new ArgumentOutOfRangeException("É necessário um Nº par de filmes para gerar o chaveamento.");
            var filmesOrdenados = filmes
                .OrderBy(f => f.Titulo)
                .ToList();

            var chaveamento = new ChaveamentoPartidas();
            var totalIteracoes = filmesOrdenados.Count / 2;
            for (int i = 0; i < totalIteracoes; i++)
            {
                chaveamento.Add(new Partida(filmesOrdenados[i], filmesOrdenados[filmesOrdenados.Count - 1 - i]));
            }
            return chaveamento;
        }
    }
}