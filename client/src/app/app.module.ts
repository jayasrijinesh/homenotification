import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


import {FormsModule} from '@angular/forms';
import {TaskServiceService} from './task-service.service';
import { TaskComponent } from './task/task.component';
import { NewtaskComponent } from './newtask/newtask.component';
import { TasksComponent } from './tasks/tasks.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TaskComponent,
    TaskComponent,
    NewtaskComponent,
    TasksComponent,
    UpdatetaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TaskServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
