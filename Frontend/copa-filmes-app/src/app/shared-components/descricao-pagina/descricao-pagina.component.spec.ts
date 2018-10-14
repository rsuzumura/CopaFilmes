import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoPaginaComponent } from './descricao-pagina.component';

describe('DescricaoPaginaComponent', () => {
  let component: DescricaoPaginaComponent;
  let fixture: ComponentFixture<DescricaoPaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescricaoPaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
