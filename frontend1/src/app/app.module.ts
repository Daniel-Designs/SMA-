import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthModule } from './auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './commons/footer/footer.component';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
