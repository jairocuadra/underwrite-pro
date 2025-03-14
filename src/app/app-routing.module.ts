import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnderwritingWorkbenchComponent } from './underwriting-workbench/underwriting-workbench.component';
import { KanbanBoardComponent } from './workboard/kanban-board/kanban-board.component';
import { RelatedPoliciesComponent } from './related-policies/related-policies.component';
import { TestComponent } from './test/test.component';
import { PolicyDatesComponent } from './policy-dates/policy-dates.component';
import { ComponentLibraryDemoComponent } from './component-library-demo/component-library-demo.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { AiChatbotComponent } from './ai-chatbot/ai-chatbot.component';

const routes: Routes = [
  { path: '', redirectTo: '/underwriting/workboard', pathMatch: 'full' },
  { path: 'workbench', redirectTo: '/underwriting/workboard', pathMatch: 'full' },
  { path: 'test', component: TestComponent },
  { path: 'policy-dates', component: PolicyDatesComponent },
  { path: 'component-library', component: ComponentLibraryDemoComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'ai-chatbot', component: AiChatbotComponent },
  { 
    path: 'underwriting', 
    component: UnderwritingWorkbenchComponent,
    children: [
      { path: '', redirectTo: 'workboard', pathMatch: 'full' },
      { path: 'workboard', component: KanbanBoardComponent },
      { path: 'related-business-policies', component: RelatedPoliciesComponent },
      { path: 'policy-dates', component: PolicyDatesComponent },
      // Add more child routes for other navigation items as needed
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    useHash: true,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
