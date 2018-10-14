using CopaFilmes.Dominio.Extensoes;
using System.Collections.Generic;
using System.Linq;

namespace CopaFilmes.Dominio.Entidades
{
    public class Torneio
    {
        public ICollection<Filme> FilmesParticipantes { get; private set; } = new HashSet<Filme>();

        public List<Filme> DefinirVencedores()
        {
            var filmes = this.FilmesParticipantes
                .OrderBy(f => f.Titulo)
                .ToList();

            return ObterVencedores(filmes);
        }

        private List<Filme> ObterVencedores(ICollection<Filme> filmes)
        {
            var vencedores = new HashSet<Filme>();
            while (filmes.Any())
            {
                var filme1 = filmes.RetirarPrimeiroDaLista();
                var filme2 = filmes.RetirarUltimoDaLista();
                vencedores.Add(DefinirVencedor(new[] { filme1, filme2 }));
            }

            if (vencedores.Count == 2)
            {
                return OrdenarVencedores(vencedores)
                    .ToList();
            }
            else
            {
                return ObterVencedores(vencedores);
            }
        }

        private Filme DefinirVencedor(Filme[] filmes)
        {
            return OrdenarVencedores(filmes).First();
        }

        public IEnumerable<Filme> OrdenarVencedores(IEnumerable<Filme> filmes)
        {
            return filmes
                .OrderByDescending(f => f.Nota)
                .ThenBy(f => f.Titulo);
        }
    }
}