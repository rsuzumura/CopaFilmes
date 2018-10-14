import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FilmeService } from '../../services/filme.service';
import { TorneioService } from 'src/app/services/torneio.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { Filme } from '../../models/filme';
import { Torneio } from 'src/app/models/torneio';
import { FilmeSelecionadoArgs } from 'src/app/shared-components/seletor-filme/filme-selecionado-args';

import { map, finalize } from 'rxjs/operators';
import _ from 'lodash';

@Component({
    selector: 'app-selecao-fimes',
    templateUrl: './selecao-fimes.component.html',
    styleUrls: ['./selecao-fimes.component.css']
})
export class SelecaoFimesComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    grupoDeFilmes: Array<Filme[]>;
    torneio: Torneio;
    maximoParticipantes = 8;
    constructor(
        private router: Router,
        private filmeService: FilmeService,
        private torneioService: TorneioService
    ) {
        this.torneio = new Torneio();
    }

    ngOnInit() {
        this.blockUI.start('Aguarde...');
        this.torneioService.reset();
        this.filmeService.getFilmes()
            .pipe(
                map(filmes => {
                    const grupoDeFilmes: Array<Filme[]> = [];
                    filmes.forEach((f, index) => {
                        const indiceGrupo = Math.floor(index / 4);
                        if (grupoDeFilmes.length < indiceGrupo + 1) {
                            grupoDeFilmes.push([]);
                        }
                        grupoDeFilmes[indiceGrupo].push(f);
                    });
                    return grupoDeFilmes;
                }),
                finalize(() => {
                    this.blockUI.stop();
                })
            )
            .subscribe(filmes => {
                this.grupoDeFilmes = filmes;
            });
    }

    onSelecionarFilme(event: FilmeSelecionadoArgs) {
        if (event.selecionado) {
            if (this.torneio.filmesParticipantes.length < 8) {
                if (!_.some(this.torneio.filmesParticipantes, f => f.id === event.filme.id)) {
                    this.torneio.filmesParticipantes.push(event.filme);
                }
            } else {
                event.cancelar = true;
            }
        } else {
            _.remove(this.torneio.filmesParticipantes, f => f.id === event.filme.id);
        }
    }

    gerarCampeonato() {
        this.blockUI.start();
        this.torneioService.definirVencedores(this.torneio)
            .pipe(
                finalize(() => this.blockUI.stop())
            ).subscribe(filmes => {
                this.router.navigate(['/resultado-final']);
            });
    }
}
