import { Component } from '@angular/core';
import { Filme } from './models/filme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'copa-filmes-app';
  filme: Filme;
  constructor() {
      this.filme = new Filme();
      this.filme.titulo = 'Ricardo';
      this.filme.ano = 2012;
  }

  onSelect(selecionado) {
      console.log(selecionado);
  }
}
