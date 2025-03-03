import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <div style="padding: 20px; text-align: center;">
      <h1>Test Component Works!</h1>
      <p>This is a simple test component to diagnose routing issues.</p>
      <p>Current time: {{ currentTime }}</p>
    </div>
  `,
  styles: []
})
export class TestComponent {
  currentTime = new Date().toLocaleString();
} 