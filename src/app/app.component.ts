import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet], // Agrega CommonModule aquí
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  welcome = 'todoapp';
  tasks=[
    'instalar angular',
    'crear proyectot',
    'renderizar'
  ]
}
