import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

import { Subject } from 'rxjs/Subject';

import { VigenereCypherService, IVigenereResponse } from '../../services/vigenere-cypher.service';
import { ALPHABETS } from '../../config/alphabets';

@Component({
  selector: 'app-vigenere-coding',
  templateUrl: './vigenere-coding.component.html',
  styleUrls: ['./vigenere-coding.component.scss']
})
export class VigenereCodingComponent {

  stepEmitter: Subject<IVigenereResponse[]> = new Subject();
  displayedColumns = ['step', 'originalLetter', 'keyLetter', 'encryptedLetter', 'encryptedText'];
  dataSource = new TableDataSource(this.stepEmitter);

  alphabets = ALPHABETS;
  alphabet = ALPHABETS[0].name;
  encryptedText: string;
  key: string;
  text: string;
  title = 'vigenere';

  checked = false;

  steps = [];

  constructor(private vigenereService: VigenereCypherService) { }

  encrypt(): void {
    this.steps = [];
    if (this.checked) {
      this.vigenereService
        .getEncryptedWithCodes(this.key, this.text, this.alphabet)
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
        .getEncrypted(this.key, this.text, this.alphabet)
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
