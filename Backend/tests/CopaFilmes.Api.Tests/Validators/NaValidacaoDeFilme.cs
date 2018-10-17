using CopaFilmes.Api.Validators;
using FluentValidation.TestHelper;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace CopaFilmes.Api.Tests.Validators
{
    public class NaValidacaoDeFilme
    {
        [Fact]
        public void AoEnviarFilmeSemTituloDeveExibirErro()
        {
            var validator = new FilmeValidator();
            validator.ShouldHaveValidationErrorFor(v => v.Titulo, null as string);
            validator.ShouldHaveValidationErrorFor(v => v.Titulo, string.Empty);
        }

        [Fact]
        public void AoEnviarFilmeSemIdDeveExibirErro()
        {
            var validator = new FilmeValidator();
            validator.ShouldHaveValidationErrorFor(v => v.Id, null as string);
            validator.ShouldHaveValidationErrorFor(v => v.Id, string.Empty);
        }

        [Fact]
        public void AoEnviarFilmeSemAnoDeveExibirErro()
        {
            short ano = 0;
            var validator = new FilmeValidator();
            validator.ShouldHaveValidationErrorFor(v => v.Ano, ano);
        }

        [Fact]
        public void AoEnviarFilmeComNotaZeradaNaoDeveTerErro()
        {
            var validator = new FilmeValidator();
            validator.ShouldNotHaveValidationErrorFor(v => v.Nota, 0m);
        }
    }
}
