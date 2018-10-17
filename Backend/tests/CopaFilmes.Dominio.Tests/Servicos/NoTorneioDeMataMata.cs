using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Interfaces.Servicos;
using CopaFilmes.Dominio.Servicos;
using Moq;
using Xunit;
using static CopaFilmes.Dominio.Tests.Mocks.MockFilmes;

namespace CopaFilmes.Dominio.Tests.Servicos
{
    public class NoTorneioDeMataMata
    {
        [Fact]
        public void AoDisputarAsPartidasDoTorneioDeveIrEliminandoAteChegarAFinal()
        {
            //ARRANGE
            var chaveamento = new ChaveamentoPartidas
            {
                new Partida(OsIncriveis2, JurassicWorld),
                new Partida(OitoMulheresEUmSegredo, Hereditario),
                new Partida(Vingadores, Deadpool2),
                new Partida(HanSolo, Thor)
            };
            var mockRegraVencedor = new Mock<IRegraVencedor>();
            mockRegraVencedor.Setup(r => r.Ranquear(It.IsAny<Partida>()))
                .Returns(new[] { OsIncriveis2, OitoMulheresEUmSegredo });
            var torneio = new TorneioMataMata(mockRegraVencedor.Object);

            //ACT
            var chaveamentoFinal = torneio.DisputarPartidas(chaveamento);

            //ASSERT
            Assert.Single(chaveamentoFinal);
            Assert.Equal(2, chaveamentoFinal.ChaveamentoAnterior.Count);
            Assert.Equal(4, chaveamentoFinal.ChaveamentoAnterior.ChaveamentoAnterior.Count);
        }

        [Fact]
        public void AoChegarNaFinalDeveRetornarEleMesmo()
        {
            //ARRANGE
            var chaveamento = new ChaveamentoPartidas
            {
                new Partida(OsIncriveis2, JurassicWorld)
            };
            var mockRegraVencedor = new Mock<IRegraVencedor>();
            mockRegraVencedor.Setup(r => r.Ranquear(It.IsAny<Partida>()))
                .Returns(new[] { OsIncriveis2, OitoMulheresEUmSegredo });
            var torneio = new TorneioMataMata(mockRegraVencedor.Object);

            //ACT
            var chaveamentoFinal = torneio.DisputarPartidas(chaveamento);

            //ASSERT
            Assert.Same(chaveamento, chaveamentoFinal);
        }
    }
}