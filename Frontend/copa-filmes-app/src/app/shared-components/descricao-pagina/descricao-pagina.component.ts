import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-descricao-pagina',
  templateUrl: './descricao-pagina.component.html',
  styleUrls: ['./descricao-pagina.component.css']
})
export class DescricaoPaginaComponent implements OnInit {
    @Input() titulo: string;
    @Input() descricao: string;

  constructor() { }

  ngOnInit() {
  }
}
