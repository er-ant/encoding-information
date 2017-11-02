import { Component } from '@angular/core';

import { CesarCypherService, ICesarWithKeyResponse } from '../../services/cesar-cypher.service';
import { RUALPHABET, ENALPHABET } from '../../config/alphabets';

@Component({
  selector: 'app-cesar-coding-with-key',
  templateUrl: './cesar-coding-with-key.component.html',
  styleUrls: ['./cesar-coding-with-key.component.scss']
})
export class CesarCodingWithKeyComponent {

  alphabets = [
    {
      value: 'ru',
      alphabet: RUALPHABET
    }, {
      value: 'en',
      alphabet: ENALPHABET
    }
  ];

  alphabet = 'ru';
  encryptedText: string;
  text: string;
  title = 'cesarWithKey';
  key: string;

  constructor(private cesarService: CesarCypherService) { }

  private getAlphabet(): Array<string> {
    return this.alphabets.find(alphabet => this.alphabet === alphabet.value).alphabet;
  }

  encrypt(): void {
    this.cesarService
      .getEncryptedWithKey(this.key, this.text, this.getAlphabet())
      .subscribe(res => this.encryptedText = res.encryptedText);
  };
}
