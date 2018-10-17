using CopaFilmes.Dominio.Interfaces.Servicos;
using Microsoft.Extensions.Configuration;

namespace CopaFilmes.Api.Servicos
{
    public class RegraQuantidadeParticipantesDaConfiguracao : IRegraQuantidadeParticipantes
    {
        private readonly IConfiguration _configuration;

        public RegraQuantidadeParticipantesDaConfiguracao(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public byte ObterQuantidadeMaxima()
        {
            return _configuration.GetValue<byte>("QuantidadeMaximaParticipantes");
        }
    }
}