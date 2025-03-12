import { Component, input, signal } from '@angular/core';

import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'

@Component({
  selector: 'app-labs',
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'todoapp';
  tasks= signal([
    'instalar angular',
    'crear proyectot',
    'renderizar'
  ])

  colorControl=new FormControl();
  widhtControl= new FormControl(10,{
    nonNullable:true,
  });
  nameControl=new FormControl(50,{
    nonNullable:true,
    validators:[
      Validators.required,
      Validators.minLength(3)
    ]
  })

  constructor(){
    this.colorControl.valueChanges.subscribe(value=>{
      console.log(value)
    });
  }

  clickhandler(){
    alert('Hola')
  }
  person={
    name:'andrea',
    age:21
  }

  changehandler(event:Event){
    console.log(event);
    const input=event.target as HTMLInputElement;
    const newValue=input.value;
    this.name.set(newValue)
  }
  keydownhandler(event:KeyboardEvent){
    const input=event.target as HTMLInputElement;
    console.log(input.value);
  }
  name=signal('Angie');

}
