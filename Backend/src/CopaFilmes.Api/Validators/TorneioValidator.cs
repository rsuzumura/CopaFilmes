using CopaFilmes.Dominio.Entidades;
using FluentValidation;

namespace CopaFilmes.Api.Validators
{
    public class TorneioValidator: AbstractValidator<Torneio>
    {
        public const int QUANTIDADEFILMESPARTICIPANTES = 8;
        public TorneioValidator()
        {
            RuleFor(t => t.FilmesParticipantes)
                .Must(filmes => filmes.Count == QUANTIDADEFILMESPARTICIPANTES)
                .WithMessage($"Para iniciar o torneio, devem estar inscritos exatamente {QUANTIDADEFILMESPARTICIPANTES} participantes.");
        }
    }
}