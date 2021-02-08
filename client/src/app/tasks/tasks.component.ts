import { Component, OnInit } from '@angular/core';
import {TaskServiceService} from '../task-service.service'
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks=<any>{};
  title='Tasks';
  constructor(private taskService: TaskServiceService) { }

  ngOnInit(): void {
    
    this.taskService.getTasks().subscribe((data)=>{
      this.tasks=JSON.parse(JSON.stringify(data));
  })
  }


}
