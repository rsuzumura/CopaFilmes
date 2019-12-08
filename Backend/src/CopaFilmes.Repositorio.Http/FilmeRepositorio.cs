using CopaFilmes.Dominio.Entidades;
using CopaFilmes.Dominio.Interfaces.Repositorios;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace CopaFilmes.Repositorio.Http
{
    public class FilmeRepositorio : IFilmeRepositorio
    {
        private readonly HttpClient _client;
        public FilmeRepositorio(HttpClient client)
        {
            _client = client;
        }

        public async Task<IEnumerable<Filme>> ListarFilmesAsync()
        {
            var response = await _client.GetAsync($"{nameof(Filme)}s");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<IEnumerable<Filme>>(json);
        }
    }
}