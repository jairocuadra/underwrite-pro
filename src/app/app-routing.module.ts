import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnderwritingWorkbenchComponent } from './underwriting-workbench/underwriting-workbench.component';
import { KanbanBoardComponent } from './workboard/kanban-board/kanban-board.component';
import { RelatedPoliciesComponent } from './related-policies/related-policies.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', redirectTo: '/underwriting', pathMatch: 'full' },
  { path: 'test', component: TestComponent },
  { 
    path: 'underwriting', 
    component: UnderwritingWorkbenchComponent,
    children: [
      { path: '', redirectTo: 'workboard', pathMatch: 'full' },
      { path: 'workboard', component: KanbanBoardComponent },
      { path: 'related-business-policies', component: RelatedPoliciesComponent },
      // Add more child routes for other navigation items as needed
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
