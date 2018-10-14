import { Filme } from 'src/app/models/filme';

export class FilmeSelecionadoArgs {
    cancelar: boolean;
    constructor(
        private _selecionado: boolean,
        private _filme: Filme
    ) {
        this.cancelar = false;
    }

    get selecionado(): boolean {
        return this._selecionado;
    }

    get filme(): Filme {
        return this._filme;
    }
}
