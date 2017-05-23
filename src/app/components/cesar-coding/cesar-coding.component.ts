import { Component, OnInit } from '@angular/core';

import { CesarCypherService } from '../../services/cesar-cypher.service';
import { RUALPHABET, ENALPHABET } from '../../config/alphabets';

@Component({
  selector: 'app-cesar-coding',
  templateUrl: './cesar-coding.component.html',
  styleUrls: ['./cesar-coding.component.scss']
})
export class CesarCodingComponent implements OnInit {

  public text: string;
  public alphabet: any;
  public encryptedText: string;

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

  public shift = 1;

  constructor(private cesarService: CesarCypherService) { }

  ngOnInit() {

  }

  private getAlphabet(): Array<string> {
    return this.alphabets.find(alphabet => this.alphabet === alphabet.value).alphabet;
  }

  public encrypt() {
    this.encryptedText =
      this.cesarService.getEncrypted(this.shift, this.text, this.getAlphabet());
  };

}
