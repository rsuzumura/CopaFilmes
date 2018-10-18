import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelecaoFilmesComponent } from './components/selecao-filmes/selecao-filmes.component';
import { ResultadoFinalComponent } from './components/resultado-final/resultado-final.component';
import { ErroComponent } from './components/erro/erro.component';

const appRoutes: Routes = [
    {
        path: 'resultado-final',
        component: ResultadoFinalComponent
    },
    {
        path: 'erro',
        component: ErroComponent
    },
    { path: '**', component: SelecaoFilmesComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false // <-- debugging purposes only
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
