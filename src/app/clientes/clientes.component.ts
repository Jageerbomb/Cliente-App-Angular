import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];

  constructor(
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
   this.getData();
  }

  getData(): void{
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void{
    swal.fire({
      title: 'Esta seguro?',
      text: "Esta accion no podra ser reversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar.',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.clienteService.deleteById(cliente.id).subscribe(response => {
          this.getData();
          swal.fire(
            'Eliminado!',
            'Cliente eliminado con exito.',
            'success'
          );
        });
      }
    });
  }

}
