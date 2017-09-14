import { Component, OnInit } from '@angular/core';

import { CesarCypherService, ICesarResponse } from '../../services/cesar-cypher.service';
import { RUALPHABET, ENALPHABET } from '../../config/alphabets';

@Component({
  selector: 'app-cesar-coding',
  templateUrl: './cesar-coding.component.html',
  styleUrls: ['./cesar-coding.component.scss']
})
export class CesarCodingComponent implements OnInit {

  public alphabet: any;
  public encryptedText: string;
  public text: string;
  public title = 'cesar';

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

  public steps = [];

  constructor(private cesarService: CesarCypherService) { }

  ngOnInit() {

  }

  private getAlphabet(): Array<string> {
    return this.alphabets.find(alphabet => this.alphabet === alphabet.value).alphabet;
  }

  public encrypt() {
    this.steps = [];
    this
      .cesarService
      .partEncrypting(this.shift, this.text, this.getAlphabet())
      .subscribe(
        res => {
          this.steps.push(res);
          if (this.steps[this.text.length - 1]) {
            this.encryptedText = this.steps[this.text.length - 1].encryptedText;
          }
        }
      );
  };

}
