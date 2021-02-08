import { Component, OnInit } from '@angular/core';
import {TaskServiceService} from '../task-service.service';
import { ActivatedRoute,Router } from '@angular/router'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskFetched={title:'',
                desc:'',
                due:'',
                _id:''};
  title='Task Details';
  id='';
  
  constructor(private taskService: TaskServiceService,private router:Router,private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this._Activatedroute.snapshot.params['id'];       
    this.taskService.getTask(this.id).subscribe((data)=>{
    this.taskFetched=JSON.parse(JSON.stringify(data));
   });
  }

  editTask(taskFetched:any){
    localStorage.setItem("editTaskId", taskFetched._id.toString());
    this.router.navigate(['update']);
  };
  deleteTask(id:any){
    console.log("client ts delte")
    this.taskService.deleteTask(id);
    this.router.navigate(['/tasks']);
  
  };

}
