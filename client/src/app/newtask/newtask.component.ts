import { Component, OnInit } from '@angular/core';
import {TaskServiceService} from '../task-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {

  task={title:'',
        desc:'',
        due:''};
  title="Add New Task"
  constructor(private taskService: TaskServiceService,private router: Router) { }

  ngOnInit(): void {
  }
  addTask()
  {    
    this.taskService.newTask(this.task);   
    alert("Success");
    this.router.navigate(['/']);
  }

}
