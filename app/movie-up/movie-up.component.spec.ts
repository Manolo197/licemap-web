/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MovieUpComponent } from './movie-up.component';

describe('MovieUpComponent', () => {
  let component: MovieUpComponent;
  let fixture: ComponentFixture<MovieUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
