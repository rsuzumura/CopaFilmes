import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filme } from '../../models/filme';
import { FilmeSelecionadoArgs } from './filme-selecionado-args';

@Component({
    selector: 'app-seletor-filme',
    templateUrl: './seletor-filme.component.html',
    styleUrls: ['./seletor-filme.component.css']
})
export class SeletorFilmeComponent implements OnInit {
    selecionado: boolean;
    @Input() filme: Filme;
    @Output() selecionarFilme = new EventEmitter();

    ngOnInit() {
        this.selecionado = false;
    }

    onChange(e) {
        const args = new FilmeSelecionadoArgs(
            this.selecionado,
            this.filme
        );
        this.selecionarFilme.emit(args);
        if (args.cancelar) {
            e.source.checked = !e.source.checked;
            this.selecionado = !this.selecionado;
        }
    }
}
