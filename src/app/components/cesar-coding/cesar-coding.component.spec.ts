import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CesarCodingComponent } from './cesar-coding.component';

describe('CesarCodingComponent', () => {
  let component: CesarCodingComponent;
  let fixture: ComponentFixture<CesarCodingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CesarCodingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CesarCodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
