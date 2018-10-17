using Moq;
using Moq.Protected;
using System;
using System.Linq;
using System.Net.Http;
using System.Net.Mime;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace CopaFilmes.Repositorio.Http.Tests
{
    public class NoRepositorioDeFilmesHttp
    {
        [Fact]
        public async Task AoEfetuarAConsultaDeveRetornarAColecaoDeFilmes()
        {
            //ARRANGE
            var mockHttpMessageHandler = GetMockHttpMessageHandler();
            var url = "http://localhost/";
            var client = new HttpClient(mockHttpMessageHandler.Object);
            client.BaseAddress = new Uri(url);
            var filmeRepositorio = new FilmeRepositorio(client);

            //ACT
            var result = await filmeRepositorio.ListarFilmesAsync();

            //ASSERT
            Assert.NotNull(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public void AoEfetuarDisposeDeveChamarDisposeDoHttpClient()
        {
            //ARRANGE
            var mockHttpMessageHandler = GetMockHttpMessageHandler();
            var client = new HttpClient(mockHttpMessageHandler.Object);
            var filmeRepositorio = new FilmeRepositorio(client);

            //ACT
            filmeRepositorio.Dispose();

            //ASSERT
            mockHttpMessageHandler.Protected().Verify("Dispose", Times.Once(), true);
        }

        private Mock<HttpMessageHandler> GetMockHttpMessageHandler()
        {
            var mockHttpMessageHandler = new Mock<HttpMessageHandler>();
            var expectedJson = "[{\"id\":\"tt3606756\",\"titulo\":\"Os Incríveis 2\",\"ano\":2018,\"nota\":8.5},{\"id\":\"tt4881806\",\"titulo\":\"Jurassic World: Reino Ameaçado\",\"ano\":2018,\"nota\":6.7}]";
            var expectedResponse = new HttpResponseMessage(System.Net.HttpStatusCode.OK);
            expectedResponse.Content = new StringContent(expectedJson, Encoding.UTF8, MediaTypeNames.Application.Json);
            mockHttpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
                .Returns((HttpRequestMessage request, CancellationToken cancellationToken) => Task.FromResult(expectedResponse));
            mockHttpMessageHandler
                .Protected()
                .Setup("Dispose", It.IsAny<bool>());
            return mockHttpMessageHandler;
        }
    }
}