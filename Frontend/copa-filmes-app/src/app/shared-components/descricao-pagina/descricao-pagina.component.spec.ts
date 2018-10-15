import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoPaginaComponent } from './descricao-pagina.component';

describe('DescricaoPaginaComponent', () => {
    let component: DescricaoPaginaComponent;
    let fixture: ComponentFixture<DescricaoPaginaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DescricaoPaginaComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DescricaoPaginaComponent);
        component = fixture.componentInstance;
    });

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    });

    it('ao configurar titulo e descrição, os mesmos deve ser exibidos no html', () => {
        const tituloEsperado = 'titulo';
        const descricaoEsperada = 'descrição esperada';
        component.titulo = tituloEsperado;
        component.descricao = descricaoEsperada;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain(tituloEsperado);
        expect(compiled.querySelector('h2').textContent).toContain(descricaoEsperada);
    });
});
