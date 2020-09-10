import {Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import swal from 'sweetalert2';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  paginador: any;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.getClientes(page);
    });
  }

  getClientes(page?: number){
    this.clienteService.getClientes(page)
      .pipe(
        /*tap(response => {
          console.log('ClienteService: tap 3');
          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre)
          })
        })*/
      ).subscribe(
      response => {
        this.clientes = response.content as Cliente[]
        this.paginador = response;
      }
    );
  }

  delete(cliente: Cliente): void {
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
          this.getClientes();
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
