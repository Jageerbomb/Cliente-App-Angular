import { Component, OnInit } from '@angular/core';
import {Cliente} from "./cliente";
import {ClienteService} from "./cliente.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  title: string = 'Crear Cliente';
  cliente: Cliente = new Cliente();
  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit (): void {
  }

  save(){
    this.clienteService.save(this.cliente).subscribe(
      response => {this.router.navigate(['/clientes'])}
    )
  }

}
