import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLibraryDemoComponent } from './component-library-demo.component';

describe('ComponentLibraryDemoComponent', () => {
  let component: ComponentLibraryDemoComponent;
  let fixture: ComponentFixture<ComponentLibraryDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentLibraryDemoComponent]
    });
    fixture = TestBed.createComponent(ComponentLibraryDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
