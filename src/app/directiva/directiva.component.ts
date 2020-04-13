import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  listaCurso: string[] = ['Typescript','Javascript','Java SE','C#','PHP'];
  habilitar: boolean = true;

  constructor() { }

  setHabilitar(){
    this.habilitar = (this.habilitar==true)?false:true;
  }

}
