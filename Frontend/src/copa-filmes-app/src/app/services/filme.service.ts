import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../models/filme';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FilmeService {
    private URL = `${environment.movieUrl}filmes`;
    constructor(private client: HttpClient) { }

    getFilmes(): Observable<Filme[]> {
        return this.client.get<Filme[]>(this.URL);
    }
}
