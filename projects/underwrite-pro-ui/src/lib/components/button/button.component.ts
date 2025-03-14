import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'uwp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() label!: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'text' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() fullWidth = false;
  @Input() disabled = false;
  @Input() loading = false;
  
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  get buttonClasses(): string {
    return `
      uwp-button 
      uwp-button-${this.variant} 
      uwp-button-${this.size}
      ${this.fullWidth ? 'uwp-button-full-width' : ''}
      ${this.loading ? 'uwp-button-loading' : ''}
    `;
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit(event);
    }
  }
}
