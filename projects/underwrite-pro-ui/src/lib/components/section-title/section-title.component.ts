import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uwp-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent implements OnInit {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() color: 'primary' | 'accent' | 'default' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() withDivider = true;

  constructor() { }

  ngOnInit(): void {
  }

  get titleClasses(): string {
    return `
      uwp-section-title 
      uwp-section-title-${this.color} 
      uwp-section-title-${this.size}
    `;
  }
}
