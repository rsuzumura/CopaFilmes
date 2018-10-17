import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultadoFinalComponent } from './resultado-final.component';
import { SelecaoFilmesComponent } from '../selecao-filmes/selecao-filmes.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { BlockUIModule } from 'ng-block-ui';
import { APP_BASE_HREF } from '@angular/common';
import { TorneioService } from 'src/app/services/torneio.service';
import { Filme } from 'src/app/models/filme';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ResultadoFinalComponent', () => {
    let component: ResultadoFinalComponent;
    let fixture: ComponentFixture<ResultadoFinalComponent>;
    let vencedores: Filme[];
    let router: Router;

    beforeEach(async(() => {
        const torneioServiceStub: Partial<TorneioService> = {
            obterVencedores() {
                return vencedores;
            }
        };

        TestBed.configureTestingModule({
            declarations: [ResultadoFinalComponent, SelecaoFilmesComponent],
            imports: [NoopAnimationsModule, SharedComponentsModule, BlockUIModule, RouterTestingModule.withRoutes([]) ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: TorneioService, useValue: torneioServiceStub }
            ]
        }).compileComponents();
        router = TestBed.get(Router);
        spyOn(router, 'navigate');
    }));

    it('deve criar o componente', () => {
        fixture = TestBed.createComponent(ResultadoFinalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('deve exibir os vencedores quando o torneio for processado', () => {
        vencedores = [{
            id: '1',
            titulo: 'Título 1',
            nota: 2,
            ano: 2010
        },
        {
            id: '2',
            titulo: 'Título 2',
            nota: 1,
            ano: 2010
        }];
        fixture = TestBed.createComponent(ResultadoFinalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('app-vencedores').querySelectorAll('li').length).toEqual(2);
        expect(router.navigate).not.toHaveBeenCalled();
    });

    it('deve ter link para a página principal', () => {
        fixture = TestBed.createComponent(ResultadoFinalComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('a').textContent).toContain('GERAR NOVO CAMPEONATO');
    });

    it('deve exibir componente com o título e descrição', () => {
        fixture = TestBed.createComponent(ResultadoFinalComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('app-descricao-pagina').attributes.titulo.value).toContain('Resultado Final');
        expect(compiled.querySelector('app-descricao-pagina').attributes.descricao.value).not.toBeNull();
    });

    it('deve redirecionar para a seleção de filmes quando o torneio não for processado', () => {
        vencedores = [];
        fixture = TestBed.createComponent(ResultadoFinalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(router.navigate).toHaveBeenCalled();
    });
});
