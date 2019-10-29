import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { PullRequestsComponent } from './pullRequests/pullRequests.component';
import { PullRequestsByRepoComponent } from './pullRequestsByRepo/pullRequestsByRepo.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RepositoriesComponent,
    PullRequestsComponent,
    PullRequestsByRepoComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
