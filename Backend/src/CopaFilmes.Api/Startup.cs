using CopaFilmes.Api.Servicos;
using CopaFilmes.Api.Validators;
using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Interfaces.Repositorios;
using CopaFilmes.Dominio.Interfaces.Servicos;
using CopaFilmes.Dominio.Servicos;
using CopaFilmes.Repositorio.Http;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Net.Http;

namespace CopaFilmes.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddControllers()
                .AddFluentValidation(fv => {
                    fv.ImplicitlyValidateChildProperties = true;
                });
            services.AddHttpClient<IFilmeRepositorio, FilmeRepositorio>(client =>
            {
                client.BaseAddress = new Uri(Configuration["FilmeUrl"]);
            });
            services.AddSingleton<ITorneio, TorneioMataMata>();
            services.AddSingleton<IGeradorChaveamentoPartidas, ChaveamentoDePartidasEntreExtremosDaLista>();
            services.AddSingleton<IRegraVencedor, RegraVencedorMaiorNota>();
            services.AddSingleton<IRegraQuantidadeParticipantes, RegraQuantidadeParticipantesDaConfiguracao>();
            services.AddTransient<IValidator<Filme>, FilmeValidator>();
            services.AddTransient<IValidator<Filme[]>, FilmesParticipantesValidator>();
            services.AddOpenApiDocument(o =>
            {
                o.Title = "Copa de Filmes";
                o.Version = "v1";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors(builder => {
                    builder
                       .WithOrigins("http://localhost:4200")
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials();
                });
            }
            else
            {
                app.UseHsts();
            }

            app.UseOpenApi();
            app.UseSwaggerUi3();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}