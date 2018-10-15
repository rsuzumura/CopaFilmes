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
      declarations: [ SeletorFilmeComponent ],
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
