import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewtaskComponent } from './newtask/newtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';

const routes: Routes = [
  {path:'',
  redirectTo: '/tasks',
  pathMatch:'full'
},
  {
    path:'tasks',
    component:TasksComponent
  },
  {
    path:'task/:id',
    component:TaskComponent
  },
  {
    path:'addTask',
    component:NewtaskComponent
  },
  {
    path:'update',
    component:UpdatetaskComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
