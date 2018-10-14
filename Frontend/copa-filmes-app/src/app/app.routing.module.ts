import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelecaoFimesComponent } from './components/selecao-fimes/selecao-fimes.component';
import { ResultadoFinalComponent } from './components/resultado-final/resultado-final.component';

const appRoutes: Routes = [
    {
        path: 'resultado-final',
        component: ResultadoFinalComponent
    },
    { path: '**', component: SelecaoFimesComponent }
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
