import {Component, OnInit} from '@angular/core';
import {Cliente} from "../cliente";
import {ClienteService} from "../cliente.service";
import {ActivatedRoute} from "@angular/router";
import swal from 'sweetalert2';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente: Cliente;
  titulo:string = 'Detalle Cliente';

  private fotoSeleccionada: File;

  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.clienteService.findById(id).subscribe(cliente => {
          this.cliente = cliente;
        })
      }
    });
  }

  chooseFile(ev) {
    this.fotoSeleccionada = ev.target.files[0];
    console.log(this.fotoSeleccionada);
  }

  uploadFile() {
    this.clienteService.uploadPhoto(this.fotoSeleccionada, this.cliente.id).subscribe(cliente => {
      this.cliente = cliente;
      swal.fire('Imagen Subida!', 'La foto se ha subido con exito: ' + this.cliente.foto, "success");
    });
  }
}
