import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import _ from 'lodash';

import { FilmeService } from '../../services/filme.service';
import { TorneioService } from 'src/app/services/torneio.service';
import { FilmeSelecionadoArgs } from 'src/app/shared-components/seletor-filme/filme-selecionado-args';
import { GrupoDeFilmes } from './grupo-de-filmes';
import { Filme } from 'src/app/models/filme';

@Component({
    selector: 'app-selecao-filmes',
    templateUrl: './selecao-filmes.component.html',
    styleUrls: ['./selecao-filmes.component.css']
})
export class SelecaoFilmesComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    grupoDeFilmes: GrupoDeFilmes;
    filmesParticipantes: Filme[];
    titulo = 'Fase de Seleção';
    descricao: string;
    maximoParticipantes: number;
    filmesPorLinha = 4;
    constructor(
        private router: Router,
        private filmeService: FilmeService,
        private torneioService: TorneioService,
        private snackBar: MatSnackBar
    ) {
        this.filmesParticipantes = [];
    }

    ngOnInit() {
        this.blockUI.start('Aguarde...');
        this.torneioService.reset();
        this.filmeService.getFilmes()
            .pipe(
                finalize(() => {
                    this.blockUI.stop();
                })
            ).subscribe(filmesDisponiveis => {
                this.grupoDeFilmes = new GrupoDeFilmes(this.filmesPorLinha, filmesDisponiveis.filmes);
                this.maximoParticipantes = filmesDisponiveis.quantidadeMaximaParticipantes;
                // tslint:disable-next-line:max-line-length
                this.descricao = `Selecione ${this.maximoParticipantes} filmes que você deseja que entrem na competição e depois pressione o botão Gerar Meu Campeonato para prosseguir`;
            });
    }

    onSelecionarFilme(event: FilmeSelecionadoArgs) {
        if (event.selecionado) {
            if (this.filmesParticipantes.length < this.maximoParticipantes) {
                if (!_.some(this.filmesParticipantes, f => f.id === event.filme.id)) {
                    this.filmesParticipantes.push(event.filme);
                }
            } else {
                event.cancelar = true;
                this.snackBar.open(
                    `Não é possível adicionar mais que ${this.maximoParticipantes} filmes participantes.`,
                    null,
                    { duration: 1000 });
            }
        } else {
            _.remove(this.filmesParticipantes, f => f.id === event.filme.id);
        }
    }

    gerarCampeonato() {
        this.blockUI.start();
        this.torneioService.definirVencedores(this.filmesParticipantes)
            .pipe(
                finalize(() => this.blockUI.stop())
            ).subscribe(filmes => {
                this.router.navigate(['/resultado-final']);
            });
    }
}
