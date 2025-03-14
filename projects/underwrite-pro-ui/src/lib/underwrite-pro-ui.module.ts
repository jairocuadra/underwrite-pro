import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { ButtonComponent } from './components/button/button.component';
import { BadgeComponent } from './components/badge/badge.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

@NgModule({
  declarations: [
    CardComponent,
    SectionTitleComponent,
    ButtonComponent,
    BadgeComponent,
    FormFieldComponent,
    ToggleComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    SectionTitleComponent,
    ButtonComponent,
    BadgeComponent,
    FormFieldComponent,
    ToggleComponent,
    CheckboxComponent
  ]
})
export class UnderwriteProUiModule { }
