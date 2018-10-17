using CopaFilmes.Dominio.Entidades;
using System.Collections.Generic;

namespace CopaFilmes.Api.ViewModels
{
    public class FilmesDisponiveisViewModel
    {
        public IEnumerable<Filme> Filmes { get; set; }
        public byte QuantidadeMaximaParticipantes { get; set; }
    }
}