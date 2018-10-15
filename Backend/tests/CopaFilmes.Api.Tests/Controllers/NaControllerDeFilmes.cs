using CopaFilmes.Api.Controllers;
using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Interfaces.Repositorios;
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
            var result = Task.FromResult(new List<Filme>().AsEnumerable());
            var mockRepository = new Mock<IFilmeRepositorio>();
            mockRepository
                .Setup(r => r.ListarFilmesAsync())
                .Returns(result);
            var controller = new FilmeController(mockRepository.Object);
            var filmesResponse = await controller.GetFilmesAsync();
            mockRepository.Verify(r => r.ListarFilmesAsync(), Times.Once);
            Assert.IsType<ActionResult<IEnumerable<Filme>>>(filmesResponse);
        }
    }
}
