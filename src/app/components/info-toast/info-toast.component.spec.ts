import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoToastComponent } from './info-toast.component';

describe('InfoToastComponent', () => {
  let component: InfoToastComponent;
  let fixture: ComponentFixture<InfoToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
