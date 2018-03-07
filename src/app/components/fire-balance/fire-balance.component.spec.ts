import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireBalanceComponent } from './fire-balance.component';

describe('FireBalanceComponent', () => {
  let component: FireBalanceComponent;
  let fixture: ComponentFixture<FireBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
