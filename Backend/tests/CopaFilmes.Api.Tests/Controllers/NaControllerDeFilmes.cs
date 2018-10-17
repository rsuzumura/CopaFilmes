using CopaFilmes.Api.Controllers;
using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Interfaces.Repositorios;
using CopaFilmes.Dominio.Interfaces.Servicos;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace CopaFilmes.Api.Tests.Controllers
{
    public class NaControllerDeFilmes
    {
        [Fact]
        public async Task AoSolicitarAListagemDeFilmesDeveRetornarUmaColecaoDeFilmes()
        {
            //ARRANGE
            var valorEsperado = Task.FromResult(new List<Filme>().AsEnumerable());
            var mockFilmeRepositorio = new Mock<IFilmeRepositorio>();
            var mockRegraQuantidadeMaximaParticipantes = new Mock<IRegraQuantidadeParticipantes>();
            mockFilmeRepositorio
                .Setup(r => r.ListarFilmesAsync())
                .Returns(valorEsperado);
            mockRegraQuantidadeMaximaParticipantes
                .Setup(r => r.ObterQuantidadeMaxima())
                .Returns(8);
            var controller = new FilmeController(mockFilmeRepositorio.Object, mockRegraQuantidadeMaximaParticipantes.Object);

            //ACT
            var filmesResponse = await controller.GetFilmesAsync();

            //ASSERT
            mockFilmeRepositorio.Verify(r => r.ListarFilmesAsync(), Times.Once);
            Assert.IsType<ActionResult<IEnumerable<Filme>>>(filmesResponse);
        }
    }
}