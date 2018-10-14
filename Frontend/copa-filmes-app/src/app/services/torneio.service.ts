import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../models/filme';
import { Torneio } from '../models/torneio';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TorneioService {
    private URL = `${environment.movieUrl}torneio`;
    private vencedores: Filme[];
    constructor(private client: HttpClient) { }

    definirVencedores(torneio: Torneio): Observable<Filme[]> {
        return this.client.post<Filme[]>(this.URL, torneio)
            .pipe(
                map(filmes => {
                    this.vencedores = filmes;
                    return filmes;
                })
            );
    }

    obterVencedores(): Filme[] {
        return this.vencedores;
    }

    reset(): void {
        this.vencedores = [];
    }
}
