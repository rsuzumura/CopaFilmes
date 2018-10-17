using CopaFilmes.Dominio.Entidades;

namespace CopaFilmes.Dominio.Interfaces.Servicos
{
    public interface IRegraVencedor
    {
        Filme[] Ranquear(Partida partida);
    }
}
