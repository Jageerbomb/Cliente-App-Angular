import {Component, OnInit} from '@angular/core';
import {Cliente} from "../cliente";
import {ClienteService} from "../cliente.service";
import {ActivatedRoute} from "@angular/router";
import swal from 'sweetalert2';
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente: Cliente;
  titulo: string = 'Detalle Cliente';
  fileName: string = 'Seleccione un documento...';
  fotoSeleccionada: File;

  progreso: number = 0;

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
    if (ev != null){
      this.progreso = 0;
      this.fotoSeleccionada = ev.target!=undefined?ev.target.files[0]:null;
      if (this.fotoSeleccionada!==undefined){
        if (this.fotoSeleccionada?.type.indexOf('image') < 0) {
          swal.fire('Error Seleccionar Imagen', 'El archivo debe ser una imagen.', 'error');
          return false;
        }
        let name = this.fotoSeleccionada.name;
        this.fileName = name.split('.')[0];
      }else {
        this.fileName = 'Seleccione un documento...';
      }
    }
  }

  uploadFile() {
    if (!this.fotoSeleccionada) {
      swal.fire('Error Upload', 'Debe seleccionar una imagen.', 'error');
    } else {
      this.clienteService.uploadPhoto(this.fotoSeleccionada, this.cliente.id).subscribe(event => {
        //console.log(event);
        if (event.type === HttpEventType.Response){
          let response = event.body;
          this.cliente = response.cliente as Cliente;
          swal.fire('Imagen Subida!', response.mensaje, 'success');
          this.fileName = 'Seleccione un documento...';
        }else if ("loaded" in event) {
          this.progreso = Math.round((event.loaded / event.total) / 100);
        }
      });
    }
  }
}
