export interface IAlphabet {
  name: string;
  alphabet: Array<string>;
}

export const RUALPHABET
  = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н',
   'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь',
   'э', 'ю', 'я'];

export const ENALPHABET
  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
   'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

export const ALPHABETS = [
  {
    name: 'ru',
    alphabet: RUALPHABET
  }, {
    name: 'en',
    alphabet: ENALPHABET
  }
];
