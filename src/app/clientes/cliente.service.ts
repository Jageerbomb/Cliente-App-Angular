import {Injectable} from '@angular/core';
import {Cliente} from './cliente';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, catchError} from "rxjs/operators";
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

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.ENDPOINT).pipe(
      map(response => response as Cliente[])
    );
  };

  findById(id): Observable<Cliente> {
    const suffix = '/' + id.toString();
    return this.http.get<Cliente>(this.ENDPOINT + suffix, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje);
        swal.fire('Error ',e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.ENDPOINT, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    const suffix = '/' + cliente.id.toString();
    return this.http.put<any>(this.ENDPOINT + suffix, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }

  deleteById(id): Observable<any> {
    const suffix = '/' + id.toString();
    return this.http.delete(this.ENDPOINT + suffix).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }
}
