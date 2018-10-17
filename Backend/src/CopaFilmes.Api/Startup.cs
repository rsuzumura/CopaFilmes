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
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddFluentValidation(fv => {
                    fv.ImplicitlyValidateChildProperties = true;
                });
            services.AddScoped(provider =>
            {
                var url = this.Configuration["FilmeUrl"];
                var client = new HttpClient();
                client.BaseAddress = new Uri(url);
                return client;
            });
            services.AddScoped<IFilmeRepositorio, FilmeRepositorio>();
            services.AddSingleton<ITorneio, TorneioMataMata>();
            services.AddSingleton<IGeradorChaveamentoPartidas, ChaveamentoDePartidasEntreExtremosDaLista>();
            services.AddSingleton<IRegraVencedor, RegraVencedorMaiorNota>();
            services.AddSingleton<IRegraQuantidadeParticipantes, RegraQuantidadeParticipantesDaConfiguracao>();
            services.AddTransient<IValidator<Filme>, FilmeValidator>();
            services.AddTransient<IValidator<Filme[]>, FilmesParticipantesValidator>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
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

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}