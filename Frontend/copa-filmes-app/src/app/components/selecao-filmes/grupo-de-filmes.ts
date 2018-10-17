import { Filme } from 'src/app/models/filme';

export class GrupoDeFilmes {
    linhas: Array<Filme[]>;
    constructor(
        private quantidadeDeLinhas: number,
        private filmes: Filme[]
    ) {
        this.linhas = [];
        let filmesDaLinha = [];
        for (let i = 0; i < this.filmes.length; i++) {
            filmesDaLinha.push(this.filmes[i]);
            if (filmesDaLinha.length === this.quantidadeDeLinhas) {
                this.linhas.push(filmesDaLinha);
                filmesDaLinha = [];
            }
        }
    }
}
