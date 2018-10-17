import { GrupoDeFilmes } from './grupo-de-filmes';
import { FILMES } from 'src/app/mocks/filmes.mock';

describe('GrupoDeFilmes', () => {
    let grupoDeFilmes: GrupoDeFilmes;

    it('deve criar um grupo de 4 linhas com 4 filmes cada', () => {
        const quantidadeLinhas = 4;
        grupoDeFilmes = new GrupoDeFilmes(quantidadeLinhas, FILMES);
        expect(grupoDeFilmes.linhas.length).toBe(4);
        grupoDeFilmes.linhas.forEach(linha => {
            expect(linha.length).toBe(4);
        });
    });
});
