import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatCheckboxModule } from '@angular/material';
import { SeletorFilmeComponent } from './seletor-filme/seletor-filme.component';
import { DescricaoPaginaComponent } from './descricao-pagina/descricao-pagina.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SeletorFilmeComponent, DescricaoPaginaComponent],
  exports: [SeletorFilmeComponent, DescricaoPaginaComponent]
})
export class SharedComponentsModule { }
