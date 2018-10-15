import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TorneioService } from './torneio.service';
import { Filme } from '../models/filme';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Torneio } from '../models/torneio';

describe('TorneioService', () => {
    let httpClientSpy: { post: jasmine.Spy };
    const filmesEsperados: Filme[] = [
        { id: '1', titulo: 'Titulo 1', ano: 2010, nota: 1 },
        { id: '2', titulo: 'Titulo 2', ano: 2011, nota: 2 }
    ];
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
        httpClientSpy.post.and.returnValue(of(filmesEsperados));
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: HttpClient, useValue: httpClientSpy }
            ]
        });
    });

    it('deve ser criado', () => {
        const service: TorneioService = TestBed.get(TorneioService);
        expect(service).toBeTruthy();
    });

    it('ao definir os vencedores, devem ser retornados os filmes vencedores', () => {
        const service: TorneioService = TestBed.get(TorneioService);
        service.definirVencedores(new Torneio())
            .subscribe(filmes => {
                expect(filmes).toEqual(filmesEsperados);
                expect(service.obterVencedores()).toEqual(filmesEsperados);
            });
        expect(httpClientSpy.post).toHaveBeenCalled();
        expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
    });

    it('ao resetar os vencedores, a lista de vencedores deve estar vazia', () => {
        const service: TorneioService = TestBed.get(TorneioService);
        service.definirVencedores(new Torneio())
            .subscribe(() => {
                expect(service.obterVencedores()).toEqual(filmesEsperados);
                service.reset();
                expect(service.obterVencedores().length).toBe(0);
            });
    });
});
