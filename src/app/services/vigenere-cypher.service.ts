import { Injectable } from '@angular/core';

@Injectable()
export class VigenereCypherService {

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

  public getEncrypted(key: string, text: string,
                      alphabet: Array<string>): string {
    let encryptedText = '';
    let iterator = 0;
    let keyPositions: Array<number> = [];
    let textPositions: Array<number> = [];

    key.split('').forEach(word => {
      keyPositions.push(this.getWordPosition(alphabet, word));
    });

    text.split('').forEach(word => {
      textPositions.push(this.getWordPosition(alphabet, word));
    });

    textPositions.forEach(position => {
      let newPosition: number;
      if (keyPositions.length <= iterator) {
        iterator = 0;
      }
      if (alphabet.length >= (position + keyPositions[iterator])) {
        encryptedText += alphabet[position + keyPositions[iterator]];
      } else {
        encryptedText += alphabet[position + keyPositions[iterator] - alphabet.length];
      }
      iterator++;
    });

    return encryptedText;
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
