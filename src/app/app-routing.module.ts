import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanBoardComponent } from './workboard/kanban-board/kanban-board.component';
import { RelatedPoliciesComponent } from './related-policies/related-policies.component';
import { UnderwritingWorkbenchComponent } from './underwriting-workbench/underwriting-workbench.component';

const routes: Routes = [
  { path: '', redirectTo: '/workbench', pathMatch: 'full' },
  { path: 'workbench', component: UnderwritingWorkbenchComponent },
  { path: 'workboard', component: KanbanBoardComponent },
  { path: 'related-policies', component: RelatedPoliciesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
