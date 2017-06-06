import { Component, OnInit } from '@angular/core';

import { VigenereCypherService } from '../../services/vigenere-cypher.service';
import { RUALPHABET, ENALPHABET } from '../../config/alphabets';

@Component({
  selector: 'app-vigenere-coding',
  templateUrl: './vigenere-coding.component.html',
  styleUrls: ['./vigenere-coding.component.scss']
})
export class VigenereCodingComponent implements OnInit {

  public title = 'vigenere';

  public alphabet: any;
  public encryptedText: string;
  public key: string;
  public text: string;

  public color = 'warn';
  public checked = false;

  public steps = [];

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

  constructor(private vigenereService: VigenereCypherService) { }

  ngOnInit() {
  }

  private getAlphabet(): Array<string> {
    return this.alphabets.find(alphabet => this.alphabet === alphabet.value).alphabet;
  }

  public encrypt() {
    this.steps = [];
    if (this.checked) {
      this
        .vigenereService
        .getEncryptedWithCodes(this.key, this.text, this.getAlphabet())
        .subscribe(
          res => {
            this.steps.push(res);
            if (this.steps[this.text.length - 1]) {
              this.encryptedText = this.steps[this.text.length - 1].encryptedText;
            }
          }
        )
    } else {
      this
        .vigenereService
        .getEncrypted(this.key, this.text, this.getAlphabet())
        .subscribe(
          res => {
            this.steps.push(res);
            if (this.steps[this.text.length - 1]) {
              this.encryptedText = this.steps[this.text.length - 1].encryptedText;
            }
          }
        )
    }

  };

}
