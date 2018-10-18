import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ParametrisedLinkPipeDemoComponent } from './views/parametrised-link-pipe-demo/parametrised-link-pipe-demo.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxCommonModule, NgxRouterModule } from '@ngx-extensions/extensions';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCommonModule,
    NgxRouterModule.forRoot()
  ],
  declarations: [AppComponent, ParametrisedLinkPipeDemoComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
