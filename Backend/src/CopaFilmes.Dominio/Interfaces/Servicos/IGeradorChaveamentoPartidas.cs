using CopaFilmes.Dominio.Entidades;

namespace CopaFilmes.Dominio.Interfaces.Servicos
{
    public interface IGeradorChaveamentoPartidas
    {
        ChaveamentoPartidas CriarChaveamento(Filme[] filmes);
    }
}
