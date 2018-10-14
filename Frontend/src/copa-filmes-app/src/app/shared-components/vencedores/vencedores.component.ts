import { Component, OnInit, Input } from '@angular/core';
import { Filme } from 'src/app/models/filme';

@Component({
    selector: 'app-vencedores',
    templateUrl: './vencedores.component.html',
    styleUrls: ['./vencedores.component.css']
})
export class VencedoresComponent implements OnInit {
    @Input() vencedores: Filme[];
    constructor() { }

    ngOnInit() {
    }
}
