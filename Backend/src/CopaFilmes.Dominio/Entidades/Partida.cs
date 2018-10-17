namespace CopaFilmes.Dominio.Entidades
{
    public class Partida
    {
        public Partida(Filme filmeA, Filme filmeB)
        {
            this.FilmeA = filmeA;
            this.FilmeB = filmeB;
        }

        public Filme FilmeA { get; private set; }
        public Filme FilmeB { get; private set; }
    }
}