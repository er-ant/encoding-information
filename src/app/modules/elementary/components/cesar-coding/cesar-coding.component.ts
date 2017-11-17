import { Component, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

import { Subject } from 'rxjs/Subject';

import { CesarCypherService, ICesarResponse } from '../../services/cesar-cypher.service';

@Component({
  selector: 'app-cesar-coding',
  templateUrl: './cesar-coding.component.html',
  styleUrls: ['./cesar-coding.component.scss']
})
export class CesarCodingComponent {

  stepEmitter: Subject<ICesarResponse[]> = new Subject();
  displayedColumns = ['step', 'encryptedText'];
  dataSource = new TableDataSource(this.stepEmitter);

  alphabet = this.alphabets[0].name;
  encryptedText: string;
  text: string;
  title = 'cesar';

  shift = 1;

  steps = [];

  constructor(private _cesarService: CesarCypherService,
              @Inject('alphabets') public alphabets) { }

  encrypt(): void {
    this.steps = [];
    this._cesarService
      .partEncrypting(this.shift, this.text, this.alphabet)
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
