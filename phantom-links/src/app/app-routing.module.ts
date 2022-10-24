import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {ResultsPageComponent} from './pages/results-page/results-page.component';

const routes: Routes = [
  {path: '', component: OverviewPageComponent},
  {path: 'Results', component: ResultsPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
