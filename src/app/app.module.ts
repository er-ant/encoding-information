import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Material
import { MaterialModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdMenuModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdSliderModule } from '@angular/material';
import { MdSlideToggleModule } from '@angular/material';

// Custom
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CesarCodingComponent } from './components/cesar-coding/cesar-coding.component';
import { CesarCodingWithKeyComponent } from './components/cesar-coding-with-key/cesar-coding-with-key.component';
import { CodingPageHeaderComponent } from './components/coding-page-header/coding-page-header.component';
import { VigenereCodingComponent } from './components/vigenere-coding/vigenere-coding.component';

import { CesarCypherService } from './services/cesar-cypher.service';
import { VigenereCypherService } from './services/vigenere-cypher.service';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    CesarCodingComponent,
    CesarCodingWithKeyComponent,
    CodingPageHeaderComponent,
    VigenereCodingComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),

    // Material Modules
    MaterialModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdMenuModule,
    MdSelectModule,
    MdSliderModule,
    MdSlideToggleModule
  ],
  providers: [
    CesarCypherService,
    VigenereCypherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
