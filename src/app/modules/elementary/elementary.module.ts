import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ElementaryRoutingModule } from './elementary-routing.module';

import { CesarCypherService } from './services/cesar-cypher.service';
import { VigenereCypherService } from './services/vigenere-cypher.service';

import { CesarCodingComponent } from './components/cesar-coding/cesar-coding.component';
import { CesarCodingWithKeyComponent } from './components/cesar-coding-with-key/cesar-coding-with-key.component';
import { VigenereCodingComponent } from './components/vigenere-coding/vigenere-coding.component';

// Material
import { MaterialModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdSlideToggleModule } from '@angular/material';
import { MdSliderModule } from '@angular/material';
import { MdTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,

    // Material Modules
    MaterialModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdSelectModule,
    MdSlideToggleModule,
    MdSliderModule,
    MdTableModule,

    // Custom Modules
    ElementaryRoutingModule
  ],
  declarations: [
    CesarCodingComponent,
    CesarCodingWithKeyComponent,
    VigenereCodingComponent
  ],
  providers: [
    CesarCypherService,
    VigenereCypherService
  ]
})
export class ElementaryModule { }
