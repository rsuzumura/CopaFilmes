import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filme } from '../../models/filme';

@Component({
    selector: 'app-seletor-filme',
    templateUrl: './seletor-filme.component.html',
    styleUrls: ['./seletor-filme.component.css']
})
export class SeletorFilmeComponent implements OnInit {
    selecionado: boolean;
    @Input() filme: Filme;
    @Output() selecionarFilme = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.selecionado = false;
    }

    selecionarCard(event: any) {
        this.selecionarFilme.emit({
            selecionado: !this.selecionado
        });
    }

    onChange(event: any) {
        console.log(event);
    }
}
