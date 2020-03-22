import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { BlockUIModule } from 'ng-block-ui';

import { AppComponent } from './app.component';
import { SelecaoFilmesComponent } from './components/selecao-filmes/selecao-filmes.component';
import { ResultadoFinalComponent } from './components/resultado-final/resultado-final.component';
import { ErroComponent } from './components/erro/erro.component';

@NgModule({
  declarations: [
    AppComponent,
    SelecaoFilmesComponent,
    ResultadoFinalComponent,
    ErroComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BlockUIModule.forRoot(),
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    SharedComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
