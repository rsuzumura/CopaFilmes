import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SeletorFilmeComponent } from './seletor-filme/seletor-filme.component';
import { DescricaoPaginaComponent } from './descricao-pagina/descricao-pagina.component';
import { VencedoresComponent } from './vencedores/vencedores.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SeletorFilmeComponent, DescricaoPaginaComponent, VencedoresComponent],
  exports: [SeletorFilmeComponent, DescricaoPaginaComponent, VencedoresComponent]
})
export class SharedComponentsModule { }
