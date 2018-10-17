import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeletorFilmeComponent } from './seletor-filme.component';
import { MatCheckboxModule, MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Filme } from 'src/app/models/filme';

describe('SeletorFilmeComponent', () => {
    let component: SeletorFilmeComponent;
    let fixture: ComponentFixture<SeletorFilmeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SeletorFilmeComponent],
            imports: [FormsModule, MatCheckboxModule, MatCardModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SeletorFilmeComponent);
        component = fixture.componentInstance;
        component.filme = new Filme();
        fixture.detectChanges();
    });

    it('deve criar', () => {
        expect(component).toBeTruthy();
    });

    it('ao configurar o filme, deve exibir o título e ano', () => {
        component.filme = {
            id: '1',
            ano: 2015,
            nota: 10,
            titulo: 'teste'
        };
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h4').textContent).toContain(component.filme.titulo);
        expect(compiled.querySelector('p').textContent).toContain(component.filme.ano);
    });

    it('ao selecionar, deve disparar evento de change', () => {
        spyOn(component, 'onChange');
        const compiled = fixture.debugElement.nativeElement;
        const input = compiled.querySelector('input');
        input.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.onChange).toHaveBeenCalled();
        });
    });
});
