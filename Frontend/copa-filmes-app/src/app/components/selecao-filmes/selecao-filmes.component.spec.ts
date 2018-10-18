import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { SelecaoFilmesComponent } from './selecao-filmes.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { BlockUIModule } from 'ng-block-ui';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { ResultadoFinalComponent } from '../resultado-final/resultado-final.component';
import { APP_BASE_HREF } from '@angular/common';
import { FilmeService } from 'src/app/services/filme.service';
import { Filme } from 'src/app/models/filme';
import { of } from 'rxjs';
import { TorneioService } from 'src/app/services/torneio.service';
import { BlockUIInstanceService } from 'ng-block-ui/lib/services/block-ui-instance.service';
import { FILMES } from 'src/app/mocks/filmes.mock';
import { MatSnackBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErroComponent } from '../erro/erro.component';
import { FilmeSelecionadoArgs } from 'src/app/shared-components/seletor-filme/filme-selecionado-args';
import { Router } from '@angular/router';

describe('SelecaoFilmesComponent', () => {
    let component: SelecaoFilmesComponent;
    let fixture: ComponentFixture<SelecaoFilmesComponent>;
    let router: Router;

    beforeEach(async(() => {
        const filmeServiceStub: Partial<FilmeService> = {
            getFilmes() {
                const filmesDisponiveis = {
                    filmes: FILMES,
                    quantidadeMaximaParticipantes: 8
                };
                return of(filmesDisponiveis);
            }
        };
        const torneioServiceStub: Partial<TorneioService> = {
            definirVencedores(filmesParticipantes: Filme[]) {
                return of(FILMES);
            },
            reset() {
            }
        };
        const blockUIServiceStub: Partial<BlockUIInstanceService> = {
            getSettings() { },
            observe() {
                return of([]);
            }
        };
        TestBed.configureTestingModule({
            declarations: [SelecaoFilmesComponent, ResultadoFinalComponent, ErroComponent],
            imports: [NoopAnimationsModule, SharedComponentsModule, BlockUIModule, AppRoutingModule, MatSnackBarModule],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: FilmeService, useValue: filmeServiceStub },
                { provide: TorneioService, useValue: torneioServiceStub },
                { provide: BlockUIInstanceService, useValue: blockUIServiceStub }
            ]
        }).compileComponents();
        router = TestBed.get(Router);
        spyOn(router, 'navigate');
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelecaoFilmesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    });

    it('deve disparar evento de seleção do filme', () => {
        spyOn(component, 'onSelecionarFilme');
        const checkbox = fixture.debugElement.nativeElement.querySelector('mat-checkbox');
        const input = checkbox.querySelector('input');
        input.click();
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(component.onSelecionarFilme).toHaveBeenCalled();
            const button = fixture.debugElement.nativeElement.querySelector('#gerarCampeonato');
            expect(button.disabled).toBe(true);
        });
    });

    it('deve habilitar botão ao selecionar a quantidade de filmes esperada', () => {
        const checkboxes = fixture.debugElement.nativeElement.querySelectorAll('mat-checkbox');
        for (let i = 0; i < component.maximoParticipantes; i++) {
            const input = checkboxes[i].querySelector('input');
            input.click();
        }
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const button = fixture.debugElement.nativeElement.querySelector('#gerarCampeonato');
            expect(button.disabled).toBe(false);
            expect(component.filmesParticipantes.length).toEqual(component.maximoParticipantes);
        });
    });

    it('deve bloquear seleção de filmes ao selecionar mais que a quantidade esperada', () => {
        const checkboxes = fixture.debugElement.nativeElement.querySelectorAll('mat-checkbox');
        for (let i = 0; i < checkboxes.length; i++) {
            const input = checkboxes[i].querySelector('input');
            input.click();
        }
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.filmesParticipantes.length).toEqual(component.maximoParticipantes);
        });
    });

    it('após selecionar 3 filmes, ao clicar novamente neles, a seleção deve ser removida', async() => {
        const checkboxes = fixture.debugElement.nativeElement.querySelectorAll('mat-checkbox');
        for (let i = 0; i < 3; i++) {
            const input = checkboxes[i].querySelector('input');
            input.click();
        }
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.filmesParticipantes.length).toEqual(3);
        await fakeAsync(() => {
            tick(1000);
            for (let i = 0; i < 3; i++) {
                const input = checkboxes[i].querySelector('input');
                input.click();
            }
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(component.filmesParticipantes.length).toEqual(0);
            });
        });
    });

    it('se tentar adicionar um filme que já foi adicionado, não deve adicionar à lista', () => {
        component.filmesParticipantes = [FILMES[0]];
        component.onSelecionarFilme(new FilmeSelecionadoArgs(true, FILMES[0]));
        expect(component.filmesParticipantes.length).toBe(1);
    });

    it('ao tentar adicionar mais que a quantidade limite de filmes, deve cancelar o evento de seleção', () => {
        component.filmesParticipantes = FILMES.slice(0, 8);
        const args = new FilmeSelecionadoArgs(true, FILMES[9]);
        component.onSelecionarFilme(args);
        expect(args.cancelar).toBeTruthy();
    });
});
