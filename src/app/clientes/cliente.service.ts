import {Injectable} from '@angular/core';
import {Cliente} from './cliente';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private ENDPOINT: string = 'http://localhost:8080/api/clientes'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) {
  }

  getClientes(page:number): Observable<any> {
    return this.http.get<Cliente[]>(this.ENDPOINT+'/page/'+page).pipe(
      /*tap((response:any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre)
        })
      }),*/
      map((response:any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });
        return response;
      })/*,
      tap((response:any) => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre)
        })
      })*/
    );
  };

  findById(id): Observable<Cliente> {
    const suffix = '/' + id.toString();
    return this.http.get<Cliente>(this.ENDPOINT + suffix, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje);
        swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.ENDPOINT, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    const suffix = '/' + cliente.id.toString();
    return this.http.put<any>(this.ENDPOINT + suffix, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  deleteById(id): Observable<any> {
    const suffix = '/' + id.toString();
    return this.http.delete(this.ENDPOINT + suffix).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  uploadPhoto(archivo: File, id): Observable<Cliente>{
    let suffix = "/upload/";
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post(this.ENDPOINT + suffix, formData).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
