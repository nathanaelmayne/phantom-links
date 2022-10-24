import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewPageComponent,
    ResultsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
