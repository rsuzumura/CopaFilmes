using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Interfaces.Servicos;
using FluentValidation;

namespace CopaFilmes.Api.Validators
{
    public class FilmesParticipantesValidator : AbstractValidator<Filme[]>
    {
        public FilmesParticipantesValidator(IRegraQuantidadeParticipantes regraQuantidadeParticipantes)
        {
            var quantidadeParticipantes = regraQuantidadeParticipantes.ObterQuantidadeMaxima();
            RuleFor(filmes => filmes.Length).Equal(quantidadeParticipantes)
                .WithMessage($"Devem ser enviados exatamente {quantidadeParticipantes} participantes.");
        }
    }
}