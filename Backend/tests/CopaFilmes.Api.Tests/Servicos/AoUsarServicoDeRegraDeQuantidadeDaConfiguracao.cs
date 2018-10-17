using CopaFilmes.Api.Servicos;
using Microsoft.Extensions.Configuration;
using System;
using Xunit;

namespace CopaFilmes.Api.Tests.Servicos
{
    public class AoUsarServicoDeRegraDeQuantidadeDaConfiguracao
    {
        [Fact]
        public void AoObterOValorDeveRetornarDaConfiguracao()
        {
            //ARRANGE
            byte valorEsperado = 8;
            var configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: true)
                .Build();

            var regra = new RegraQuantidadeParticipantesDaConfiguracao(configuration);

            //ACT
            var resultado = regra.ObterQuantidadeMaxima();

            //ASSERT
            Assert.Equal(valorEsperado, resultado);
        }
    }
}