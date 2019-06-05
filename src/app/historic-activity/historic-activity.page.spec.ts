import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricActivityPage } from './historic-activity.page';

describe('HistoricActivityPage', () => {
  let component: HistoricActivityPage;
  let fixture: ComponentFixture<HistoricActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricActivityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
