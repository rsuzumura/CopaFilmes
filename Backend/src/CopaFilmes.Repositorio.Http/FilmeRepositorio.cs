using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Interfaces.Repositorios;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace CopaFilmes.Repositorio.Http
{
    public class FilmeRepositorio : IFilmeRepositorio, IDisposable
    {
        private readonly HttpClient _client;
        public FilmeRepositorio(IConfiguration configuration)
        {
            _client = new HttpClient();
            _client.BaseAddress = new Uri(configuration["FilmeUrl"]);
        }

        public async Task<IEnumerable<Filme>> ListarFilmesAsync()
        {
            var response = await _client.GetAsync("");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<IEnumerable<Filme>>(json);
        }

        public void Dispose()
        {
            _client?.Dispose();
        }
    }
}