import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

import { Subject } from 'rxjs/Subject';

import { VigenereCypherService, IVigenereResponse } from '../../services/vigenere-cypher.service';
import { RUALPHABET, ENALPHABET } from '../../config/alphabets';

@Component({
  selector: 'app-vigenere-coding',
  templateUrl: './vigenere-coding.component.html',
  styleUrls: ['./vigenere-coding.component.scss']
})
export class VigenereCodingComponent {

  stepEmitter: Subject<IVigenereResponse[]> = new Subject();
  displayedColumns = ['step', 'originalLetter', 'keyLetter', 'encryptedLetter', 'encryptedText'];
  dataSource = new TableDataSource(this.stepEmitter);

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
  key: string;
  text: string;
  title = 'vigenere';

  checked = false;

  steps = [];

  constructor(private vigenereService: VigenereCypherService) { }

  private getAlphabet(): Array<string> {
    return this.alphabets.find(alphabet => this.alphabet === alphabet.value).alphabet;
  }

  encrypt(): void {
    this.steps = [];
    if (this.checked) {
      this.vigenereService
        .getEncryptedWithCodes(this.key, this.text, this.getAlphabet())
        .subscribe(
          res => {
            this.steps.push(res);
            this.stepEmitter.next(this.steps);
          },
          () => {},
          () => this.encryptedText = this.steps[this.text.length - 1].encryptedText
        )
    } else {
      this.vigenereService
        .getEncrypted(this.key, this.text, this.getAlphabet())
        .subscribe(
          res => {
            this.steps.push(res);
            this.stepEmitter.next(this.steps);
          },
          () => {},
          () => this.encryptedText = this.steps[this.text.length - 1].encryptedText
        )
    }
  };
}

export class TableDataSource extends DataSource<any> {
  constructor(public dataObserv: Subject<IVigenereResponse[]>) {
    super();
  }

  connect(): Subject<IVigenereResponse[]> {
    return this.dataObserv;
  }

  disconnect() {
    this.dataObserv.unsubscribe();
  }
}
