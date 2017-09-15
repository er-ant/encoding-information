import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

import { Subject } from 'rxjs/Subject';

import { CesarCypherService, ICesarResponse } from '../../services/cesar-cypher.service';
import { RUALPHABET, ENALPHABET } from '../../config/alphabets';

@Component({
  selector: 'app-cesar-coding',
  templateUrl: './cesar-coding.component.html',
  styleUrls: ['./cesar-coding.component.scss']
})
export class CesarCodingComponent {

  stepEmitter: Subject<any> = new Subject();

  displayedColumns = ['step', 'encryptedText'];
  dataSource = new TableDataSource(this.stepEmitter);

  alphabets = [
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

  alphabet = this.alphabets[0].value;
  encryptedText: string;
  text: string;
  title = 'cesar';

  shift = 1;

  steps = [];

  constructor(private cesarService: CesarCypherService) { }

  private getAlphabet(): Array<string> {
    return this.alphabets.find(alphabet => this.alphabet === alphabet.value).alphabet;
  }

  encrypt() {
    this.steps = [];
    this.cesarService
      .partEncrypting(this.shift, this.text, this.getAlphabet())
      .subscribe(
        res => {
          this.steps.push(res);
          this.stepEmitter.next(this.steps);
        },
        () => {},
        () => this.encryptedText = this.steps[this.steps.length - 1].encryptedText
      );
  };

}

export class TableDataSource extends DataSource<any> {
  constructor(public dataObserv: Subject<ICesarResponse[]>) {
    super();
  }

  connect(): Subject<ICesarResponse[]> {
    return this.dataObserv;
  }

  disconnect() {
    this.dataObserv.unsubscribe();
  }
}
