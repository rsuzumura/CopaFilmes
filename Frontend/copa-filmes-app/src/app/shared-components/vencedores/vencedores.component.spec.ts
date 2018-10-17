import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VencedoresComponent } from './vencedores.component';
import { FILMES } from 'src/app/mocks/filmes.mock';

describe('VencedoresComponent', () => {
    let component: VencedoresComponent;
    let fixture: ComponentFixture<VencedoresComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VencedoresComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VencedoresComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    });

    it('deve renderizar os vencedores', () => {
        component.vencedores = [
            FILMES[0],
            FILMES[1]
        ];
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('li').length).toBe(2);
    });
});
