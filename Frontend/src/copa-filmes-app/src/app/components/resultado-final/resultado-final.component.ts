import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TorneioService } from 'src/app/services/torneio.service';
import { Filme } from 'src/app/models/filme';

@Component({
    selector: 'app-resultado-final',
    templateUrl: './resultado-final.component.html',
    styleUrls: ['./resultado-final.component.css']
})
export class ResultadoFinalComponent implements OnInit {
    vencedores: Filme[];
    constructor(
        private router: Router,
        private torneioService: TorneioService
    ) { }

    ngOnInit() {
        this.vencedores = this.torneioService.obterVencedores();
        if (this.vencedores == null || this.vencedores.length === 0) {
            this.router.navigate(['/']);
        }
    }

}
