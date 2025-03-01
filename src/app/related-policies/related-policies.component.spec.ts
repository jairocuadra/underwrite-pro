import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPoliciesComponent } from './related-policies.component';

describe('RelatedPoliciesComponent', () => {
  let component: RelatedPoliciesComponent;
  let fixture: ComponentFixture<RelatedPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedPoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
