using System.Collections.Generic;
using System.Linq;

namespace CopaFilmes.Dominio.Extensoes
{
    public static class CollectionExtensions
    {
        public static T RetirarPrimeiroDaLista<T>(this ICollection<T> lista)
            where T : class
        {
            var item = lista.First();
            lista.Remove(item);
            return item;
        }

        public static T RetirarUltimoDaLista<T>(this ICollection<T> lista)
            where T : class
        {
            var item = lista.Last();
            lista.Remove(item);
            return item;
        }
    }
}