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

  public getEncrypted(shift: number, string: string,
                            alphabet: Array<string>): string {
    let encryptedText = '';
    let wordPosition: number;
    string.split('').forEach((word: string) => {
      wordPosition = (this.getWordPosition(alphabet, word) + shift) % 32;
      if (alphabet[wordPosition]) {
        encryptedText += alphabet[wordPosition];
      }
    });

    return encryptedText;
  }

}
