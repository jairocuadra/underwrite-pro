import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnderwritingWorkbenchComponent } from './underwriting-workbench/underwriting-workbench.component';

const routes: Routes = [
  { path: '', redirectTo: '/underwriting', pathMatch: 'full' },
  { path: 'underwriting', component: UnderwritingWorkbenchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
