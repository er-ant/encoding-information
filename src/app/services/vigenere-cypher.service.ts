import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs';

export interface IVigenereResponse {
  originalLetter: IVigenereLetter;
  keyLetter: IVigenereLetter;
  encryptedLetter: IVigenereLetter;
  encryptedText: string;
}

export interface IVigenereLetter {
  word: string;
  number: number;
}

@Injectable()
export class VigenereCypherService {

  constructor() { }

  private getWordPosition(alphabet: Array<string>, word: string): number {
    let position: number;

    alphabet.forEach((wordByArray: string, index: number) => {
      if (wordByArray === word) {
        position = index;
      }
    });

    return position;
  }

  public getEncrypted(key: string, text: string, alphabet: Array<string>): Observable<IVigenereResponse> {
    let encryptedText = '';
    let encryptedLetter: string;
    let iterator = 0;
    let keyWordPosition: number;
    let textWordposition: number;
    let keyArray: Array<string>;
    let textArray: Array<string>;
    let responseObject: IVigenereResponse;

    return Observable.create((observer: Observer<IVigenereResponse>) => {
      keyArray =
        key.split('').filter(word => word !== ' ' && this.getWordPosition(alphabet, word) >= 0);
      textArray =
        text.split('').filter(word => word !== ' ');
      responseObject = Object.assign({});

      textArray.forEach((textWord: string, index: number) => {
        textWordposition = this.getWordPosition(alphabet, textWord);
        if (textWordposition >= 0) {
          if (keyArray.length < iterator) {
            iterator = 0;
          }

          keyWordPosition = this.getWordPosition(alphabet, keyArray[iterator]);

          if (alphabet.length >= (textWordposition + keyWordPosition)) {
            encryptedLetter = alphabet[textWordposition + keyWordPosition];
            encryptedText += encryptedLetter;
          } else {
            encryptedLetter = alphabet[textWordposition + keyWordPosition - alphabet.length];
            encryptedText += encryptedLetter;
          }

          responseObject.originalLetter = {
            word: textWord,
            number: textWordposition + 1
          };
          responseObject.keyLetter = {
            word: keyArray[iterator],
            number: keyWordPosition + 1
          };
          responseObject.encryptedLetter = {
            word: encryptedLetter,
            number: this.getWordPosition(alphabet, encryptedLetter) + 1
          };
          responseObject.encryptedText =
            encryptedText + textArray.join('').slice(index + 1, textArray.length);

          iterator++;
        } else {
          responseObject.originalLetter = Object.assign({});
          responseObject.encryptedLetter = Object.assign({});
          encryptedText += textWord;
          responseObject.originalLetter.word = textWord;
          responseObject.encryptedLetter.word = textWord;
          responseObject.encryptedText =
            encryptedText + textArray.join('').slice(index + 1, textArray.length);
        }
        observer.next(responseObject);
        responseObject = <IVigenereResponse>{};
      });

      observer.complete();
    });
  }

  public getEncryptedWithCodes(key: string, text: string,
                               alphabet: Array<string>): string {
    let encryptedText = '';
    let iterator = 0;
    let keyCodes: Array<number> = [];
    let maxSymbols = 256;
    let textCodes: Array<number> = [];

    key.split('').forEach(word => {
      keyCodes.push(word.charCodeAt(0));
    });

    text.split('').forEach(word => {
      textCodes.push(word.charCodeAt(0));
    });

    textCodes.forEach(position => {
      let newPosition: number;
      if (keyCodes.length <= iterator) {
        iterator = 0;
      }
      if (maxSymbols >= (position + keyCodes[iterator])) {
        encryptedText += String.fromCharCode(position + keyCodes[iterator]);
      } else {
        encryptedText += String.fromCharCode(position + keyCodes[iterator] - maxSymbols);
      }
      iterator++;
    });

    return encryptedText;
  }
}
