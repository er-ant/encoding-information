import { Component, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

import { Subject } from 'rxjs/Subject';

import { VigenereCypherService, IVigenereResponse } from '../../services/vigenere-cypher.service';

@Component({
  selector: 'app-vigenere-coding',
  templateUrl: './vigenere-coding.component.html',
  styleUrls: ['./vigenere-coding.component.scss']
})
export class VigenereCodingComponent {

  stepEmitter: Subject<IVigenereResponse[]> = new Subject();
  displayedColumns = ['step', 'originalLetter', 'keyLetter', 'encryptedLetter', 'encryptedText'];
  dataSource = new TableDataSource(this.stepEmitter);

  alphabet = this.alphabets[0].name;
  encryptedText: string;
  key: string;
  text: string;
  title = 'vigenere';

  checked = false;

  steps = [];

  constructor(private _vigenereService: VigenereCypherService,
              @Inject('alphabets') public alphabets) { }

  encrypt(): void {
    this.steps = [];
    if (this.checked) {
      this._vigenereService
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
      this._vigenereService
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
