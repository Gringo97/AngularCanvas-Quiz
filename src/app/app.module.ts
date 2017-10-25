import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MicanvasComponent } from './micanvas/micanvas.component';
import { MilibComponent } from './milib/milib.component';

@NgModule({
  declarations: [
    AppComponent,
    MicanvasComponent,
    MilibComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
