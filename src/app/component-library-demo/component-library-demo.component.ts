import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-library-demo',
  templateUrl: './component-library-demo.component.html',
  styleUrls: ['./component-library-demo.component.scss']
})
export class ComponentLibraryDemoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick(event: MouseEvent): void {
    console.log('Button clicked:', event);
  }
  
  onToggleChange(checked: boolean): void {
    console.log('Toggle changed:', checked);
  }
  
  onCheckboxChange(checked: boolean): void {
    console.log('Checkbox changed:', checked);
  }
}
