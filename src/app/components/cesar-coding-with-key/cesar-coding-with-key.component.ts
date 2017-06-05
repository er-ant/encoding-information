import { Component, OnInit } from '@angular/core';

import { CesarCypherService, ICesarWithKeyResponse } from '../../services/cesar-cypher.service';
import { RUALPHABET, ENALPHABET } from '../../config/alphabets';

@Component({
  selector: 'app-cesar-coding-with-key',
  templateUrl: './cesar-coding-with-key.component.html',
  styleUrls: ['./cesar-coding-with-key.component.scss']
})
export class CesarCodingWithKeyComponent implements OnInit {

  public alphabet: any;
  public encryptedText: string;
  public key: string;
  public text: string;
  public title = 'cesarWithKey';

  public alphabets = [
    {
      value: 'ru',
      name: 'Русский',
      alphabet: RUALPHABET
    }, {
      value: 'en',
      name: 'English',
      alphabet: ENALPHABET
    }
  ];

  constructor(private cesarService: CesarCypherService) { }

  ngOnInit() {

  }

  private getAlphabet(): Array<string> {
    return this.alphabets.find(alphabet => this.alphabet === alphabet.value).alphabet;
  }

  public encrypt() {
    this
      .cesarService
      .getEncryptedWithKey(this.key, this.text, this.getAlphabet())
      .subscribe(res => this.encryptedText = res.encryptedText);
  };
}
