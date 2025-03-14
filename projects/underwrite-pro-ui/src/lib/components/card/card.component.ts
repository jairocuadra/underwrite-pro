import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uwp-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() padding: 'small' | 'medium' | 'large' = 'medium';
  @Input() elevation: 'none' | 'low' | 'medium' | 'high' = 'low';
  @Input() fullWidth = false;
  @Input() noBorder = false;

  constructor() { }

  ngOnInit(): void {
  }

  get cardClasses(): string {
    return `
      uwp-card 
      uwp-card-padding-${this.padding} 
      uwp-card-elevation-${this.elevation}
      ${this.fullWidth ? 'uwp-card-full-width' : ''}
      ${this.noBorder ? 'uwp-card-no-border' : ''}
    `;
  }
}
