import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FilmesDisponiveis } from '../models/filmes-disponiveis';

@Injectable({
    providedIn: 'root'
})
export class FilmeService {
    private URL = `${environment.movieUrl}filmes`;
    constructor(private client: HttpClient) { }

    getFilmes(): Observable<FilmesDisponiveis> {
        return this.client.get<FilmesDisponiveis>(this.URL);
    }
}
