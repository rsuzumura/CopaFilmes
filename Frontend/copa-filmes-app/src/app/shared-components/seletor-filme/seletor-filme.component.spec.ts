import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeletorFilmeComponent } from './seletor-filme.component';

describe('SeletorFilmeComponent', () => {
  let component: SeletorFilmeComponent;
  let fixture: ComponentFixture<SeletorFilmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeletorFilmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeletorFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
