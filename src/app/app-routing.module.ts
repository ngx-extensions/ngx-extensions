import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParametrisedLinkPipeDemoComponent } from './views/parametrised-link-pipe-demo/parametrised-link-pipe-demo.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/demo/P000/WS00/M000'
  },
  {
    path: 'demo/:plant/:workshop/:product',
    component: ParametrisedLinkPipeDemoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      paramsInheritanceStrategy: 'always'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
