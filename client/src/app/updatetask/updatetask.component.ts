import { Component, OnInit } from '@angular/core';
import {TaskServiceService} from '../task-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {

  task={title:'',
  desc:'',
  due:'',
  _id:''};
  title='Update Task Details'
  constructor(private router:Router,private taskService:TaskServiceService) { }

  ngOnInit(): void {
    let taskId = localStorage.getItem("editTaskId");
    this.taskService.getTask(taskId).subscribe((data)=>{
      this.task=JSON.parse(JSON.stringify(data));
  })
  }
  editTask()
  {    
    this.taskService.editTask(this.task);   
    alert("Success");
    this.router.navigate(['/']);
  }

}
