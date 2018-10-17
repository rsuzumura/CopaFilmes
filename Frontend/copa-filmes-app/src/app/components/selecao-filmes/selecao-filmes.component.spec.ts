import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

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

describe('SelecaoFilmesComponent', () => {
    let component: SelecaoFilmesComponent;
    let fixture: ComponentFixture<SelecaoFilmesComponent>;

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
            definirVencedores(torneio: Torneio) {
                return of(filmes);
            },
            reset() {
            }
        };
        const blockUIServiceStub: Partial<BlockUIInstanceService> = {
            getSettings() {},
            observe() {
                return of([]);
             }
        };
        TestBed.configureTestingModule({
            declarations: [SelecaoFilmesComponent, ResultadoFinalComponent],
            imports: [NoopAnimationsModule, SharedComponentsModule, BlockUIModule, AppRoutingModule, MatSnackBarModule],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: FilmeService, useValue: filmeServiceStub },
                { provide: TorneioService, useValue: torneioServiceStub },
                { provide: BlockUIInstanceService, useValue: blockUIServiceStub }
            ]
        }).compileComponents();
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

    it('deve habilitar botão ao selecionar 8 filmes', () => {
        const checkboxes = fixture.debugElement.nativeElement.querySelectorAll('mat-checkbox');
        for (let i = 0; i < 8; i++) {
            const input = checkboxes[i].querySelector('input');
            input.click();
        }
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const button = fixture.debugElement.nativeElement.querySelector('#gerarCampeonato');
            expect(button.disabled).toBe(false);
            expect(component.filmesParticipantes.length).toEqual(8);
        });
    });

    it('deve bloquear seleção de filmes ao selecionar mais de 8', () => {
        const checkboxes = fixture.debugElement.nativeElement.querySelectorAll('mat-checkbox');
        for (let i = 0; i < checkboxes.length; i++) {
            const input = checkboxes[i].querySelector('input');
            input.click();
        }
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.filmesParticipantes.length).toEqual(8);
        });
    });

    it('Após selecionar 3 filmes, ao clicar novamente neles, a seleção deve ser removida', () => {
        const checkboxes = fixture.debugElement.nativeElement.querySelectorAll('mat-checkbox');
        for (let i = 0; i < 3; i++) {
            const input = checkboxes[i].querySelector('input');
            input.click();
        }
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.filmesParticipantes.length).toEqual(3);
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
});
