import { Component, computed, signal,effect, Injector, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {Task} from '../../models/task.model'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks= signal<Task[]>([])

  filter=signal<'all'|'pending'| 'completed'>('all');
  tareasByFilter=computed(()=>{
    const filter=this.filter();
    const tasks=this.tasks();
    if(filter==='pending'){
      return tasks.filter(tak=>!tak.completed)
    }
    if(filter==='completed'){
      return tasks.filter(tak=>tak.completed)
    }
    return tasks;
  })

 newTaskControl=new FormControl('',{
  nonNullable:true,
  validators:[
    Validators.required
  ]
 });

 injector = inject(Injector);

 ngOnInit(){
  const storage=localStorage.getItem('tasks');
  if(storage){
    const tasks=JSON.parse(storage);
    this.tasks.set(tasks);
  }
  this.tracktasks();
 }

 tracktasks(){
  effect(()=>{
    const tasks=this.tasks();
    console.log(tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },{injector:this.injector})
 }

  addTask(title:string){
    const newTask={
      id:Date.now(),
      title,
      completed:false,
    };
    this.tasks.update((tasks)=> [... tasks,newTask])
  }
  changehandler(){
    if(this.newTaskControl.valid)
      {
        const value= this.newTaskControl.value.trim();
        if(value!==''){
        this.addTask(value);
        this.newTaskControl.setValue('');
        }
      }

  }
  deletetask(index: number){
    this.tasks.update((tasks)=>tasks.filter((task,position)=>position!==index));
  }
  updatetask(index:number){
    this.tasks.update((tasks)=>{
      return tasks.map((task,position)=>{
        if(position===index){
          return {
            ... task,
            completed:!task.completed
          }
        }
        return task;
      })
    })
  }
  updateTaskEditingMode(index : number){
    this.tasks.update((tasks)=>{
      return tasks.map((task,position)=>{
        if(position===index){
          return {
            ... task,
            editing:true
          }
        }
        return {
          ...task,
          editing:false
        };
      })
    })
  }
  updateTaskText(index : number,event:Event){
    const input=event.target as HTMLInputElement;
    this.tasks.update((tasks)=>{
      return tasks.map((task,position)=>{
        if(position===index){
          return {
            ... task,
            title:input.value,
            editing:false
          }
        }
        return task;
      })
    })
  }

  changeFilter(filter:'all'|'pending'| 'completed'){
    this.filter.set(filter);
  }
  deletetaskfilter(){
    this.tasks.update((tasks)=>tasks.filter((task)=>!task.completed));
  }
}
