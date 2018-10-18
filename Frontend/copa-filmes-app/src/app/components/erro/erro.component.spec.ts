import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroComponent } from './erro.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';

describe('ErroComponent', () => {
    let component: ErroComponent;
    let fixture: ComponentFixture<ErroComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ErroComponent],
            imports: [SharedComponentsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ErroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    });
});
