import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoFimesComponent } from './selecao-fimes.component';

describe('SelecaoFimesComponent', () => {
  let component: SelecaoFimesComponent;
  let fixture: ComponentFixture<SelecaoFimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoFimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoFimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
