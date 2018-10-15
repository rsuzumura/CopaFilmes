using CopaFilmes.Dominio.Entidades;
using FluentValidation;

namespace CopaFilmes.Api.Validators
{
    public class FilmeValidator : AbstractValidator<Filme>
    {
        public FilmeValidator()
        {
            RuleFor(f => f.Id).NotEmpty();
            RuleFor(f => f.Ano).NotEmpty();
            RuleFor(f => f.Nota).NotNull();
            RuleFor(f => f.Titulo).NotEmpty();
        }
    }
}