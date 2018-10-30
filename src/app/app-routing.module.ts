import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParametrisedLinkPipeDemoComponent } from './views/parametrised-link-pipe-demo/parametrised-link-pipe-demo.component';
import { ConnectQueryParamDemoComponent } from './views/connect-query-param-demo/connect-query-param-demo.component';

const routes: Routes = [
  {
    path: 'forms/connect-query-param',
    component: ConnectQueryParamDemoComponent
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

export const ROUTED_COMPONENTS = [
  ConnectQueryParamDemoComponent,
  ParametrisedLinkPipeDemoComponent
];
