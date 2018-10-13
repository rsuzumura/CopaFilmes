import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule, MatCheckboxModule, MatButtonModule, MatGridListModule } from '@angular/material';
import { SharedComponentsModule } from './shared-components/shared-components.module';

import { AppComponent } from './app.component';
import { SelecaoFimesComponent } from './components/selecao-fimes/selecao-fimes.component';
import { ResultadoFinalComponent } from './components/resultado-final/resultado-final.component';

@NgModule({
  declarations: [
    AppComponent,
    SelecaoFimesComponent,
    ResultadoFinalComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatGridListModule,
    MatButtonModule,
    SharedComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
