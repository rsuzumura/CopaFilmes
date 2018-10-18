import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilmeService } from './filme.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FilmesDisponiveis } from '../models/filmes-disponiveis';

describe('FilmeService', () => {
    let httpClientSpy: { get: jasmine.Spy };
    const filmesEsperados: FilmesDisponiveis = {
        filmes: [
            { id: '1', titulo: 'Titulo 1', ano: 2010, nota: 1 },
            { id: '2', titulo: 'Titulo 2', ano: 2011, nota: 2 }
        ],
        quantidadeMaximaParticipantes: 8
    };
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        httpClientSpy.get.and.returnValue(of(filmesEsperados));
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: HttpClient, useValue: httpClientSpy }
            ]
        });
    });

    it('deve ser criado', () => {
        const service: FilmeService = TestBed.get(FilmeService);
        expect(service).toBeTruthy();
    });

    it('deve retornar os filmes ao efetuar a consulta', () => {
        const service: FilmeService = TestBed.get(FilmeService);
        service.getFilmes().subscribe(filmes => {
            expect(filmes).toEqual(filmesEsperados, 'filmes esperados');
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
    });
});
