import {Component, OnInit} from '@angular/core';
import {Cliente} from "../cliente";
import {ClienteService} from "../cliente.service";
import {ActivatedRoute, Router} from "@angular/router";
import swal from 'sweetalert2';
import {Region} from "../region";

@Component({
  selector: 'app-form',
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent implements OnInit {
  cliente: Cliente = new Cliente();
  regiones: Region[] = [];
  errores: string[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.cargarCliente();
    this.clienteService.getRegions().subscribe((regiones) => this.regiones = regiones);
    this.clearForm();
  }

  clearForm(): void {
    this.cliente.id = null;
    this.cliente.nombre = null;
    this.cliente.apellido = null;
    this.cliente.createAt = null;
  }

  cargarCliente() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.findById(id).subscribe(json => {
          this.cliente = json;
        })
      }
    })
  }

  create() {
    this.clienteService.create(this.cliente).subscribe(cliente => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo Cliente', 'El cliente ' + cliente.nombre + ' ha sido creado con exito', "success");
      },(err=>{
        this.errores = err.error.errors as string[];
        console.error("CODIGO DEL ERROR DESDE EL BACKEND: " + err.status)
        console.error(err.error.errors)
      })
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
          this.clienteService.update(this.cliente).subscribe(json => {
              this.router.navigate(['/clientes']);
              swal.fire('Cliente Actualizado', json.mensaje + ': ' + json.cliente.nombre, "success");
            },err=>{
              this.errores = err.error as string[];
              console.error("CODIGO DEL ERROR DESDE EL BACKEND: " + err.status)
              console.error(this.errores)
            }
          )
        }
      }
    );
  }

  compararRegion(o1: Region, o2:Region):boolean{
    if (o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id == o2.id ;
  }
}
