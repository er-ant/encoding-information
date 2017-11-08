import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    switch (navigator.language) {
      case 'ru':
        this.translate.setDefaultLang(navigator.language);
        break;
      default:
        this.translate.setDefaultLang('en');
    }
  }
}
