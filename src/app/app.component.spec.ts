import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { MaterialModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdMenuModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdSliderModule } from '@angular/material';
import { MdSlideToggleModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CesarCodingComponent } from './components/cesar-coding/cesar-coding.component';
import { CesarCodingWithKeyComponent } from './components/cesar-coding-with-key/cesar-coding-with-key.component';
import { CodingPageHeaderComponent } from './components/coding-page-header/coding-page-header.component';
import { VigenereCodingComponent } from './components/vigenere-coding/vigenere-coding.component';

import { HttpLoaderFactory } from './translate-loader';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (HttpLoaderFactory),
            deps: [HttpClient]
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
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
