import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CesarCodingComponent } from './components/cesar-coding/cesar-coding.component';
import { CesarCodingWithKeyComponent } from './components/cesar-coding-with-key/cesar-coding-with-key.component';
import { VigenereCodingComponent } from './components/vigenere-coding/vigenere-coding.component';

const routes: Routes = [
  {
    path: 'cesar',
    component: CesarCodingComponent,
  }, {
    path: 'cesar/key',
    component: CesarCodingWithKeyComponent
  }, {
    path: 'vigenere',
    component: VigenereCodingComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ElementaryRoutingModule {}
