import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uwp-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {
  @Input() text!: string;
  @Input() variant: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default' = 'default';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() rounded = false;
  @Input() outlined = false;
  @Input() icon?: string;

  constructor() { }

  ngOnInit(): void {
  }

  get badgeClasses(): string {
    return `
      uwp-badge 
      uwp-badge-${this.variant} 
      uwp-badge-${this.size}
      ${this.rounded ? 'uwp-badge-rounded' : ''}
      ${this.outlined ? 'uwp-badge-outlined' : ''}
      ${this.icon ? 'uwp-badge-with-icon' : ''}
    `;
  }
}
