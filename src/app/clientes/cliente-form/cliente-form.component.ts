import {Component, OnInit} from '@angular/core';
import {Cliente} from "../cliente";
import {ClienteService} from "../cliente.service";
import {ActivatedRoute, Router} from "@angular/router";
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent implements OnInit {

  cliente: Cliente = new Cliente();

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.clearForm();
    this.cargarCliente();
  }

  clearForm(): void {
    this.cliente.id = null;
    this.cliente.nombre = '';
    this.cliente.apellido = '';
    this.cliente.createAt = new Date();
  }

  cargarCliente() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.findById(id).subscribe(response => {
          this.cliente = response;
        })
      }
    })
  }

  save() {
    this.clienteService.create(this.cliente).subscribe(response => {
        this.router.navigate(['/clientes']);
        swal.fire(
          'Listo',
          'Cliente ' + response.nombre + ' creado con exito!',
          "success"
        );
      }
    )
  }

  update() {
    swal.fire({
      title: 'Atencion!',
      text: "Los datos se sobreescribiran.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Editar.',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.clienteService.update(this.cliente).subscribe(response => {
            this.router.navigate(['/clientes']);
            swal.fire('Listo', 'Cliente ' + response.nombre + ' a sido actualizado!', "success");
          }
        )
      }
    });
  }

}
