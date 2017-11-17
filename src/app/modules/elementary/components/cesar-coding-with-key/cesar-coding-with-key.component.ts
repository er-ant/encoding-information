import { Component, Inject } from '@angular/core';

import { CesarCypherService, ICesarWithKeyResponse } from '../../services/cesar-cypher.service';
import { ALPHABETS } from '../../../../config/alphabets';

@Component({
  selector: 'app-cesar-coding-with-key',
  templateUrl: './cesar-coding-with-key.component.html',
  styleUrls: ['./cesar-coding-with-key.component.scss']
})
export class CesarCodingWithKeyComponent {

  alphabet = this.alphabets[0].name;
  encryptedText: string;
  text: string;
  title = 'cesarWithKey';
  key: string;

  constructor(private _cesarService: CesarCypherService,
              @Inject('alphabets') public alphabets) { }

  encrypt(): void {
    this._cesarService
      .getEncryptedWithKey(this.key, this.text, this.alphabet)
      .subscribe(res => this.encryptedText = res.encryptedText);
  };
}
