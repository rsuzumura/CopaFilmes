using CopaFilmes.Api.Validators;
using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Interfaces.Servicos;
using Moq;
using Xunit;

namespace CopaFilmes.Api.Tests.Validators
{
    public class NaValidacaoDeFilmesParticipantes
    {
        [Fact]
        public void AoEnviarMenosFilmesQueOParametrizadoDeveExibirErro()
        {
            //ARRANGE
            var mockRegra = new Mock<IRegraQuantidadeParticipantes>();
            mockRegra.Setup(r => r.ObterQuantidadeMaxima()).Returns(8);
            var validator = new FilmesParticipantesValidator(mockRegra.Object);

            //ACT
            var result = validator.Validate(new[]
            {
                new Filme()
            });

            //ASSERT
            mockRegra.Verify(r => r.ObterQuantidadeMaxima(), Times.AtLeastOnce());
            Assert.False(result.IsValid);
        }

        [Fact]
        public void AoEnviarFilmesCompletosNaQuantidadeCertaNaoDeveExibirErro()
        {
            //ARRANGE
            var mockRegra = new Mock<IRegraQuantidadeParticipantes>();
            mockRegra.Setup(r => r.ObterQuantidadeMaxima()).Returns(2);
            var validator = new FilmesParticipantesValidator(mockRegra.Object);

            //ACT
            var result = validator.Validate(new[]
            {
                new Filme{ Id = "1", Titulo = "Teste", Ano = 2012, Nota = 1.8m },
                new Filme{ Id = "1", Titulo = "Teste", Ano = 2012, Nota = 1.8m }
            });

            //ASSERT
            Assert.True(result.IsValid);
        }
    }
}
