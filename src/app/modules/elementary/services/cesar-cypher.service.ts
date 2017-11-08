import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { ALPHABETS } from '../../../config/alphabets';

export interface ICesarResponse {
  encryptedText: string;
  index: number;
}

export interface ICesarWithKeyResponse {
  encryptedText: string;
  key: Array<string>;
  arrayKeyNumbers: Array<number>;
  arrayWords: Array<string[]>;
}

@Injectable()
export class CesarCypherService {

  constructor() { }

  private getAlphabet(alphabetName: string): Array<string> {
    return ALPHABETS.find(alphabet => alphabetName === alphabet.name).alphabet;
  }

  private getWordPosition(alphabet: Array<string>, word: string): number {
    let position: number;

    alphabet.forEach((wordByArray, index: number) => {
      if (wordByArray === word.toLowerCase()) {
        position = index;
      }
    });

    return position;
  }

  private getEncryptedWord(shift: number, alphabet: Array<string>, word: string): string {
    let newWord: string;
    let position: number;
    let upperCaseFlag: boolean;
    let wordPosition: number;

    alphabet.forEach((wordByArray, index: number) => {
      if (wordByArray === word) {
        position = index;
      } else if (wordByArray === word.toLowerCase()) {
        position = index;
        upperCaseFlag = true;
      }
    });

    if (position > -1) {
      if (upperCaseFlag) {
        wordPosition = (this.getWordPosition(alphabet, word) + shift) % alphabet.length;
        newWord = alphabet[wordPosition].toUpperCase();
      } else {
        wordPosition = (this.getWordPosition(alphabet, word) + shift) % alphabet.length;
        newWord = alphabet[wordPosition];
      }
    } else {
      newWord = word;
    }

    return newWord;
  }

  public partEncrypting(shift: number, text: string, alphabetName: string): Observable<ICesarResponse> {
    let alphabet = this.getAlphabet(alphabetName);
    let bufferText = '';
    let position: number;
    let responseObject: ICesarResponse;

    return Observable.create((observer: Observer<ICesarResponse>) => {
      responseObject = Object.assign({});
      text.split('').forEach((word: string, index: number) => {
        bufferText += this.getEncryptedWord(shift, alphabet, word);
        responseObject.index = index + 1;
        responseObject.encryptedText = bufferText + text.slice(index + 1, text.length);
        observer.next(responseObject);
        responseObject = <ICesarResponse>{};
      });
      observer.complete();
    });

  }

  public getEncryptedWithKey(key: string, text: string, alphabetName: string): Observable<ICesarWithKeyResponse> {
    let alphabet = this.getAlphabet(alphabetName);
    let array: Array<string[]> = [];
    let arrayKeyNumbers: Array<number> = [];
    let countColumns: number;
    let countRows: number;
    let encryptedText = '';
    let keyAsArray = key.split('');
    let textIterator = 0;
    let partialArray: Array<string>;
    let responseObject: ICesarWithKeyResponse = Object.assign({});
    let usedWordsById: Array<number> = [];

    return Observable.create((observer: Observer<ICesarWithKeyResponse>) => {
      countColumns = key.length;
      countRows = Math.ceil(text.length / key.length);

      // Slice text for arrays of key's size
      for (let i = 0; i < countRows; i++) {
        partialArray = text.substr(textIterator, countColumns).split('');
        if (partialArray.length < countColumns) {
          let difference = countColumns - partialArray.length;
          for (let j = 0; j < difference; j++) {
            partialArray.push(alphabet[j]);
          }
        }
        array.push(partialArray);
        textIterator += countColumns;
      };

      key.split('').sort().forEach((item, index: number) => {
        for (let i = 0; i < countColumns; i++) {
          if (keyAsArray[i] === item && usedWordsById.indexOf(i) < 0) {
            array.forEach(miniArray => {
              encryptedText += miniArray[i];
            });
            usedWordsById.push(i);
            break;
          };
        };
      });

      responseObject.arrayKeyNumbers = usedWordsById;
      responseObject.arrayWords = array;
      responseObject.encryptedText = encryptedText;
      responseObject.key = keyAsArray;
      observer.next(responseObject);
      observer.complete();
    });
  }
}
