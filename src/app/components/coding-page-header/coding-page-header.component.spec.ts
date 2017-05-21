import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingPageHeaderComponent } from './coding-page-header.component';

describe('CodingPageHeaderComponent', () => {
  let component: CodingPageHeaderComponent;
  let fixture: ComponentFixture<CodingPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodingPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
