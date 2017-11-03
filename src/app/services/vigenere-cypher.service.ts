import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { ALPHABETS } from '../config/alphabets';

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

  private getAlphabet(alphabetName: string): Array<string> {
    return ALPHABETS.find(alphabet => alphabetName === alphabet.name).alphabet;
  }

  private getWordPosition(alphabet: Array<string>, word: string): number {
    let position: number;

    alphabet.forEach((wordByArray: string, index: number) => {
      if (wordByArray === word.toLowerCase()) {
        position = index;
      }
    });

    return position;
  }

  public getEncrypted(key: string, text: string, alphabetName: string):
  Observable<IVigenereResponse> {
    let alphabet = this.getAlphabet(alphabetName);
    let encryptedLetter: string;
    let encryptedText = '';
    let iterator = 0;
    let keyArray: Array<string>;
    let keyWordPosition: number;
    let responseObject: IVigenereResponse;
    let textArray: Array<string>;
    let textWordposition: number;

    return Observable.create((observer: Observer<IVigenereResponse>) => {
      keyArray =
        key.split('').filter(word => word !== ' ' && this.getWordPosition(alphabet, word) >= 0);
      textArray =
        text.split('').filter(word => word !== ' ');
      responseObject = Object.assign({});

      textArray.forEach((textWord: string, index: number) => {
        textWordposition = this.getWordPosition(alphabet, textWord);
        if (textWordposition >= 0) {
          if (keyArray.length <= iterator) {
            iterator = 0;
          }

          keyWordPosition = this.getWordPosition(alphabet, keyArray[iterator]);

          if (alphabet.length > (textWordposition + keyWordPosition + 1)) {
            encryptedLetter = alphabet[textWordposition + keyWordPosition + 1];
            encryptedText += encryptedLetter;
          } else {
            encryptedLetter = alphabet[textWordposition + keyWordPosition + 1 - alphabet.length];
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

  public getEncryptedWithCodes(key: string, text: string, alphabetName: string):
  Observable<IVigenereResponse> {
    let alphabet = this.getAlphabet(alphabetName);
    let encryptedText = '';
    let encryptedLetter: string;
    let iterator = 0;
    let keyWordPosition: number;
    let textWordposition: number;
    let keyCodes: Array<number> = [];
    let maxSymbols = 256;
    let textCodes: Array<number> = [];
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
        textWordposition = textWord.charCodeAt(0);
        if (textWordposition >= 0) {
          if (keyArray.length <= iterator) {
            iterator = 0;
          }

          keyWordPosition = keyArray[iterator].charCodeAt(0);

          if (maxSymbols >= (textWordposition + keyWordPosition)) {
            encryptedLetter = String.fromCharCode(textWordposition + keyWordPosition);
            encryptedText += encryptedLetter;
          } else {
            encryptedLetter = String.fromCharCode(textWordposition + keyWordPosition - maxSymbols);
            encryptedText += encryptedLetter;
          }

          responseObject.originalLetter = {
            word: textWord,
            number: textWordposition
          };
          responseObject.keyLetter = {
            word: keyArray[iterator],
            number: keyWordPosition
          };
          responseObject.encryptedLetter = {
            word: encryptedLetter,
            number: encryptedLetter.charCodeAt(0)
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
}
