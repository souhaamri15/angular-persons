import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { HomeComponent } from './home/home.component';

import { personsComponent } from './persons/persons.component';
import { personDetailComponent } from './person-detail/person-detail.component';
import { personFormComponent } from './person-form/person-form.component';

import { personsService } from './services/persons.service';

const appRoutes: Routes = [
  { path: 'persons', component: personsComponent },
  { path: 'persons/new', component: personFormComponent },
  { path: 'persons/:id', component: personDetailComponent },
  { path: 'persons/:id/edit', component: personFormComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    NotFoundComponent,

    HomeComponent,

    personsComponent,
    personFormComponent,
    personDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  providers: [personsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
