import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VigenereCodingComponent } from './vigenere-coding.component';

describe('VigenereCodingComponent', () => {
  let component: VigenereCodingComponent;
  let fixture: ComponentFixture<VigenereCodingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VigenereCodingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VigenereCodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
