import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyDatesComponent } from './policy-dates.component';

describe('PolicyDatesComponent', () => {
  let component: PolicyDatesComponent;
  let fixture: ComponentFixture<PolicyDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyDatesComponent]
    });
    fixture = TestBed.createComponent(PolicyDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
