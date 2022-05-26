import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttackComponent } from './attack/attack.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetectionComponent } from './detection/detection.component';
import { MitigationComponent } from './mitigation/mitigation.component';
import { TacticComponent } from './tactic/tactic.component';
import { TechniqueComponent } from './technique/technique.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'detection', component: DetectionComponent},
  { path: 'attack', component: AttackComponent},
  { path: 'tactic', component: TacticComponent},
  { path: 'technique', component: TechniqueComponent},
  { path: 'mitigation', component: MitigationComponent},
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
