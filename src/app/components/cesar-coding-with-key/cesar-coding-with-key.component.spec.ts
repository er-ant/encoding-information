import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CesarCodingWithKeyComponent } from './cesar-coding-with-key.component';

describe('CesarCodingWithKeyComponent', () => {
  let component: CesarCodingWithKeyComponent;
  let fixture: ComponentFixture<CesarCodingWithKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CesarCodingWithKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CesarCodingWithKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
