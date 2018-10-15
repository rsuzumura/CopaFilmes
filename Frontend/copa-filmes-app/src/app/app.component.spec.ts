import { TestBed, async } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material';
import { AppRoutingModule } from './app.routing.module';
import { BlockUIModule } from 'ng-block-ui';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { AppComponent } from './app.component';
import { SelecaoFimesComponent } from './components/selecao-fimes/selecao-fimes.component';
import { ResultadoFinalComponent } from './components/resultado-final/resultado-final.component';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                SelecaoFimesComponent,
                ResultadoFinalComponent
            ],
            imports: [AppRoutingModule, MatToolbarModule, BlockUIModule, SharedComponentsModule],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
        }).compileComponents();
    }));

    it('deve criar o componente', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('deve ter link para a página principal', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('a').textContent).toContain('COPA DO MUNDO DE FILMES');
        expect(compiled.querySelector('a').attributes.routerLink.value).toBe('/');
    });

    it('deve ter container de navegação de rotas', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('router-outlet')).not.toBeUndefined();
    });
});
