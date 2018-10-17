using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Interfaces.Servicos;
using System.Linq;

namespace CopaFilmes.Dominio.Servicos
{
    public class RegraVencedorMaiorNota : IRegraVencedor
    {
        public Filme[] Ranquear(Partida partida)
        {
            return (new[] { partida.FilmeA, partida.FilmeB })
                .OrderByDescending(o => o.Nota)
                .ThenBy(o => o.Titulo)
                .ToArray();
        }
    }
}