import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../../services/filme.service';
import { Filme } from '../../models/filme';

@Component({
    selector: 'app-selecao-fimes',
    templateUrl: './selecao-fimes.component.html',
    styleUrls: ['./selecao-fimes.component.css']
})
export class SelecaoFimesComponent implements OnInit {
    filmes: Filme[];
    constructor(private filmeService: FilmeService) { }

    ngOnInit() {
        this.filmeService.getFilmes()
            .subscribe(filmes => {
                this.filmes = filmes;
            });
    }
}
