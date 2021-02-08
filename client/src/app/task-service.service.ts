import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http:HttpClient) { }
  getTask(id:any){
    return this.http.get("http://localhost:3000/api/"+id);
  }

  getTasks(){
    return this.http.get("http://localhost:3000/api/tasks");
  }
  newTask(task:any)
  {   
   return this.http.post("http://localhost:3000/api/insert",task)
    .subscribe(data =>{console.log(data)})
  }
  deleteTask(id:any)
  {
    return this.http.delete("http://localhost:3000/api/remove/"+id)
    .subscribe(data =>{console.log(data)})
  }
  editTask(task:any)
  {
    return this.http.put("http://localhost:3000/api/update",task)
    .subscribe(data =>{console.log(data)})
  }
}
