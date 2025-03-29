import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxDemoComponent } from './message-box-demo.component';

describe('MessageBoxDemoComponent', () => {
  let component: MessageBoxDemoComponent;
  let fixture: ComponentFixture<MessageBoxDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageBoxDemoComponent]
    });
    fixture = TestBed.createComponent(MessageBoxDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
