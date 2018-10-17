using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Servicos;
using Xunit;

namespace CopaFilmes.Dominio.Tests.Servicos
{
    public class NaRegraDeVencedorUsandoMaiorNota
    {
        [Fact]
        public void QuandoOPrimeiroFilmeTiverMaiorNotaNaPartidaEleSeraOVencedor()
        {
            //ARRANGE
            var filmeVencedorEsperado = new Filme { Titulo = "Titulo 1", Nota = 8.3m };
            var filmePerdedorEsperado = new Filme { Titulo = "Titulo 2", Nota = 8.29m };
            var regraVencedor = new RegraVencedorMaiorNota();
            var partida = new Partida(filmeVencedorEsperado, filmePerdedorEsperado);

            //ACT
            var filmesRanqueados = regraVencedor.Ranquear(partida);

            //ASSERT
            Assert.Same(filmeVencedorEsperado, filmesRanqueados[0]);
            Assert.Same(filmePerdedorEsperado, filmesRanqueados[1]);
        }

        [Fact]
        public void QuandoOSegundoFilmeTiverMaiorNotaNaPartidaEleSeraOVencedor()
        {
            //ARRANGE
            var filmePerdedorEsperado = new Filme { Titulo = "Titulo 1", Nota = 8.29m };
            var filmeVencedorEsperado = new Filme { Titulo = "Titulo 2", Nota = 8.3m };
            var regraVencedor = new RegraVencedorMaiorNota();
            var partida = new Partida(filmePerdedorEsperado, filmeVencedorEsperado);

            //ACT
            var filmesRanqueados = regraVencedor.Ranquear(partida);

            //ASSERT
            Assert.Same(filmeVencedorEsperado, filmesRanqueados[0]);
            Assert.Same(filmePerdedorEsperado, filmesRanqueados[1]);
        }

        [Fact]
        public void QuandoOsFilmesTiveremAMesmaNotaODesempateSeraPeloTituloEmOrdemAlfabetica()
        {
            //ARRANGE
            var filmeVencedorEsperado = new Filme { Titulo = "Matrix", Nota = 8.3m };
            var filmePerdedorEsperado = new Filme { Titulo = "Star Wars", Nota = 8.3m };
            var regraVencedor = new RegraVencedorMaiorNota();
            var partida = new Partida(filmeVencedorEsperado, filmePerdedorEsperado);

            //ACT
            var filmesRanqueados = regraVencedor.Ranquear(partida);

            //ASSERT
            Assert.Same(filmeVencedorEsperado, filmesRanqueados[0]);
            Assert.Same(filmePerdedorEsperado, filmesRanqueados[1]);
        }
    }
}
