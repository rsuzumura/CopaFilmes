using Moq;
using Moq.Protected;
using System;
using System.Linq;
using System.Net;
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
            var mockHttpMessageHandler = GetMockHttpMessageHandler();
            var url = "http://localhost/";
            var client = new HttpClient(mockHttpMessageHandler.Object)
            {
                BaseAddress = new Uri(url)
            };
            var filmeRepositorio = new FilmeRepositorio(client);

            var result = await filmeRepositorio.ListarFilmesAsync();

            Assert.NotNull(result);
            Assert.Equal(2, result.Count());
        }

        private Mock<HttpMessageHandler> GetMockHttpMessageHandler()
        {
            var mockHttpMessageHandler = new Mock<HttpMessageHandler>(MockBehavior.Strict);
            var expectedJson = "[{\"id\":\"tt3606756\",\"titulo\":\"Os Incríveis 2\",\"ano\":2018,\"nota\":8.5},{\"id\":\"tt4881806\",\"titulo\":\"Jurassic World: Reino Ameaçado\",\"ano\":2018,\"nota\":6.7}]";
            mockHttpMessageHandler
               .Protected()
               .Setup<Task<HttpResponseMessage>>(
                  "SendAsync",
                  ItExpr.IsAny<HttpRequestMessage>(),
                  ItExpr.IsAny<CancellationToken>()
               )
               .ReturnsAsync(new HttpResponseMessage()
               {
                   StatusCode = HttpStatusCode.OK,
                   Content = new StringContent(expectedJson, Encoding.UTF8, MediaTypeNames.Application.Json)
               })
               .Verifiable();
            return mockHttpMessageHandler;
        }
    }
}