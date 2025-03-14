import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'uwp-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() labelPosition: 'left' | 'right' = 'right';
  @Input() disabled = false;
  @Input() color: 'primary' | 'accent' | 'success' | 'warning' | 'error' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() indeterminate = false;
  
  @Output() checkboxChange = new EventEmitter<boolean>();
  
  private _checked = false;
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};
  
  get checked(): boolean {
    return this._checked;
  }
  
  @Input()
  set checked(value: boolean) {
    if (this._checked !== value) {
      this._checked = value;
      this.onChange(value);
      this.checkboxChange.emit(value);
    }
  }
  
  get checkboxClasses(): string {
    return `
      uwp-checkbox
      uwp-checkbox-${this.color}
      uwp-checkbox-${this.size}
      ${this.checked ? 'uwp-checkbox-checked' : ''}
      ${this.indeterminate ? 'uwp-checkbox-indeterminate' : ''}
      ${this.disabled ? 'uwp-checkbox-disabled' : ''}
      uwp-checkbox-label-${this.labelPosition}
    `;
  }
  
  toggle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (!this.disabled) {
      this.checked = !this.checked;
      this.indeterminate = false;
      this.onTouched();
    }
  }
  
  // ControlValueAccessor methods
  writeValue(value: boolean): void {
    this._checked = value;
  }
  
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
