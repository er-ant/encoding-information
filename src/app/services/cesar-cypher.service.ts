import { Injectable } from '@angular/core';

@Injectable()
export class CesarCypherService {

  constructor() { }

  private getWordPosition(alphabet: Array<string>, word: string): number {
    let position: number;

    alphabet.forEach((wordByArray, index) => {
      if (wordByArray === word) {
        position = index;
      }
    });

    return position;
  }

  public getEncrypted(shift: number, text: string,
                            alphabet: Array<string>): string {
    let encryptedText = '';
    let wordPosition: number;
    text.split('').forEach((word: string) => {
      wordPosition
        = (this.getWordPosition(alphabet, word) + shift) % alphabet.length;
      if (alphabet[wordPosition]) {
        encryptedText += alphabet[wordPosition];
      }
    });

    return encryptedText;
  }

  public getEncryptedWithKey(key: string, text: string,
                             alphabet: Array<string>): string {
    let array: Array<string[]> = [];
    let countColumns: number;
    let countRows: number;
    let encryptedText = '';
    let textIterator = 0;
    let partialArray: Array<string>;

    countColumns = key.length;
    countRows = Math.ceil(text.length / key.length);

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
    key.split('').sort().forEach(item => {
      key.split('').forEach((word, index) => {
        if (word === item) {
          array.forEach(miniArray => {
            encryptedText += miniArray[index];
          });
          return;
        };
      });
    });

    return encryptedText;
  }
}
