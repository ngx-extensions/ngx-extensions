import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgxCommonModule,
  NgxRouterModule,
  NgxFormsModule
} from '@ngx-extensions/extensions';
import { NgxScreenfullModule } from '@ngx-extensions/screenfull';

import { AppComponent } from './app.component';
import { AppRoutingModule, ROUTED_COMPONENTS } from './app-routing.module';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxCommonModule,
    NgxFormsModule,
    NgxScreenfullModule,
    NgxRouterModule.forRoot()
  ],
  declarations: [AppComponent, ROUTED_COMPONENTS],
  bootstrap: [AppComponent]
})
export class AppModule {}
