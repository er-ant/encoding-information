import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';

import { Observable } from 'rxjs/Observable';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export class TranslateHttpLoader implements TranslateLoader {

  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`/encoding-information/assets/i18n/${lang}.json`);
  }
}
