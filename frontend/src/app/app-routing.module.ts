import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: CreateComponent },
  { path: 'about', component: AboutComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
