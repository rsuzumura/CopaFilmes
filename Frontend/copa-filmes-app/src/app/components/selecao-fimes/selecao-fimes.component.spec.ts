import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoFimesComponent } from './selecao-fimes.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { BlockUIModule } from 'ng-block-ui';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { ResultadoFinalComponent } from '../resultado-final/resultado-final.component';
import { APP_BASE_HREF } from '@angular/common';
import { FilmeService } from 'src/app/services/filme.service';
import { Filme } from 'src/app/models/filme';
import { of } from 'rxjs';
import { TorneioService } from 'src/app/services/torneio.service';
import { Torneio } from 'src/app/models/torneio';
import { BlockUIInstanceService } from 'ng-block-ui/lib/services/block-ui-instance.service';

describe('SelecaoFimesComponent', () => {
    let component: SelecaoFimesComponent;
    let fixture: ComponentFixture<SelecaoFimesComponent>;
    let filmes: Filme[];

    beforeEach(async(() => {
        filmes = [];
        const filmeServiceStub: Partial<FilmeService> = {
            getFilmes() {
                return of(filmes);
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
            declarations: [SelecaoFimesComponent, ResultadoFinalComponent],
            imports: [SharedComponentsModule, BlockUIModule, AppRoutingModule],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: FilmeService, useValue: filmeServiceStub },
                { provide: TorneioService, useValue: torneioServiceStub },
                { provide: BlockUIInstanceService, useValue: blockUIServiceStub }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelecaoFimesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    });
});
