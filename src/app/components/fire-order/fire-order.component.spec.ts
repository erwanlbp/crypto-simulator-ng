import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireOrderComponent } from './fire-order.component';

describe('FireOrderComponent', () => {
  let component: FireOrderComponent;
  let fixture: ComponentFixture<FireOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
