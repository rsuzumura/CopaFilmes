using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Servicos;
using System;
using Xunit;
using static CopaFilmes.Dominio.Tests.Mocks.MockFilmes;

namespace CopaFilmes.Dominio.Tests.Servicos
{
    public class NoChaveamentoDePartidasEntreOsExtremosDaLista
    {
        [Fact]
        public void AoTentarCriarChaveamentoComQuantidadeImparDeveDispararExcecaoDeArgumentoForaDeRange()
        {
            //ARRANGE
            var filmes = new[] { OsIncriveis2 };
            var chaveamentoDePartidasEntreExtremosDaLista = new ChaveamentoDePartidasEntreExtremosDaLista();

            //ACT/ASSERT
            Assert.Throws<ArgumentOutOfRangeException>(() =>
            {
                chaveamentoDePartidasEntreExtremosDaLista.CriarChaveamento(filmes);
            });
        }

        [Fact]
        public void AoInformarQuantidadeParDeFilmesDeveGerarOChaveamentoDasPartidasOrdenandoPorNomeEConfrontadoOsExtremosDaLista()
        {
            //ARRANGE
            var filmes = new[] { OsIncriveis2, JurassicWorld, OitoMulheresEUmSegredo, Hereditario, Vingadores, Deadpool2, HanSolo, Thor };
            var chaveamentoDePartidasEntreExtremosDaLista = new ChaveamentoDePartidasEntreExtremosDaLista();

            //ACT
            var chaveamento = chaveamentoDePartidasEntreExtremosDaLista.CriarChaveamento(filmes);

            //ASSERT
            Assert.Equal(4, chaveamento.Count);
            Assert.Same(Deadpool2, chaveamento[0].FilmeA);
            Assert.Same(Vingadores, chaveamento[0].FilmeB);
            Assert.Same(HanSolo, chaveamento[1].FilmeA);
            Assert.Same(Thor, chaveamento[1].FilmeB);
            Assert.Same(Hereditario, chaveamento[2].FilmeA);
            Assert.Same(OsIncriveis2, chaveamento[2].FilmeB);
            Assert.Same(JurassicWorld, chaveamento[3].FilmeA);
            Assert.Same(OitoMulheresEUmSegredo, chaveamento[3].FilmeB);
        }

        [Fact]
        public void AoInformarNuloDeveGerarExcecaoDeReferenciaNula()
        {
            //ARRANGE
            Filme[] filmes = null;
            var chaveamentoDePartidasEntreExtremosDaLista = new ChaveamentoDePartidasEntreExtremosDaLista();

            //ACT/ASSERT
            Assert.Throws<NullReferenceException>(() =>
            {
                chaveamentoDePartidasEntreExtremosDaLista.CriarChaveamento(filmes);
            });
        }
    }
}