import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-coding-page-header',
  templateUrl: './coding-page-header.component.html',
  styleUrls: ['./coding-page-header.component.scss']
})
export class CodingPageHeaderComponent {

  @Input() public heading: string;

  constructor() { }

}
