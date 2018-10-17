using CopaFilmes.Api.Controllers;
using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Interfaces.Servicos;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace CopaFilmes.Api.Tests.Controllers
{
    public class NaControllerDoTorneio
    {
        [Fact]
        public async Task AoEnviarOsFilmesParticipantesDeveRetornarAListagemDosVencedores()
        {
            //ARRANGE
            var filmesEsperados = new[]
            {
                new Filme { Id = "1" },
                new Filme { Id = "2" }
            };
            var chaveamentoPartidas = new ChaveamentoPartidas
            {
                new Partida(filmesEsperados[0], filmesEsperados[1])
            };
            var mockGeradorChaveamento = new Mock<IGeradorChaveamentoPartidas>();
            mockGeradorChaveamento
                .Setup(_ => _.CriarChaveamento(It.IsAny<Filme[]>()))
                .Returns(It.IsAny<ChaveamentoPartidas>());
            var mockTorneio = new Mock<ITorneio>();
            mockTorneio
                .Setup(_ => _.DisputarPartidas(It.IsAny<ChaveamentoPartidas>()))
                .Returns(chaveamentoPartidas);
            var mockRegraVencedor = new Mock<IRegraVencedor>();
            mockRegraVencedor
                .Setup(_ => _.Ranquear(It.IsAny<Partida>()))
                .Returns(filmesEsperados);
            var filmesParticipantes = new[]
            {
                new Filme(),
                new Filme(),
                new Filme(),
                new Filme()
            };
            var controller = new TorneioController(
                mockGeradorChaveamento.Object,
                mockTorneio.Object,
                mockRegraVencedor.Object
            );

            var response = await controller.DefinirVencedoresAsync(filmesParticipantes);

            mockGeradorChaveamento.Verify(_ => _.CriarChaveamento(It.IsAny<Filme[]>()), Times.Once);
            mockTorneio.Verify(_ => _.DisputarPartidas(It.IsAny<ChaveamentoPartidas>()), Times.AtLeastOnce);
            mockRegraVencedor.Verify(_ => _.Ranquear(It.IsAny<Partida>()), Times.Once);
            Assert.IsType<OkObjectResult>(response.Result);
        }
    }
}