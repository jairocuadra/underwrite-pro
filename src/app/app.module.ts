import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';

// Material Imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UnderwritingWorkbenchComponent } from './underwriting-workbench/underwriting-workbench.component';
import { ModeBannerComponent } from './shared/mode-banner/mode-banner.component';
import { EditModeModalComponent } from './shared/edit-mode-modal/edit-mode-modal.component';
import { KanbanBoardComponent } from './workboard/kanban-board/kanban-board.component';
import { RelatedPoliciesComponent } from './related-policies/related-policies.component';
import { TestComponent } from './test/test.component';
import { PolicyDatesComponent } from './policy-dates/policy-dates.component';
import { ComponentLibraryDemoComponent } from './component-library-demo/component-library-demo.component';
import { UnderwriteProUiModule } from 'underwrite-pro-ui';
import { AiChatbotComponent } from './ai-chatbot/ai-chatbot.component';
import { NdaDialogComponent } from './ai-chatbot/nda-dialog/nda-dialog.component';
import { ExitModalComponent } from './shared/exit-modal/exit-modal.component';
import { ActionButtonsComponent } from './shared/action-buttons/action-buttons.component';
import { MessageBoxComponent } from './shared/message-box/message-box.component';
import { MessageBoxDemoComponent } from './demo/message-box-demo/message-box-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UnderwritingWorkbenchComponent,
    ModeBannerComponent,
    EditModeModalComponent,
    KanbanBoardComponent,
    RelatedPoliciesComponent,
    TestComponent,
    PolicyDatesComponent,
    ComponentLibraryDemoComponent,
    AiChatbotComponent,
    NdaDialogComponent,
    ExitModalComponent,
    ActionButtonsComponent,
    MessageBoxComponent,
    MessageBoxDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSnackBarModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatCheckboxModule,
    UnderwriteProUiModule
  ],
  providers: [
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
