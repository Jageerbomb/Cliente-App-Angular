import {Injectable} from '@angular/core';
import {Cliente} from './cliente';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private ENDPOINT: string = 'http://localhost:8080/api/clientes'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.ENDPOINT).pipe(
      map(response => response as Cliente[])
    );
  };

  findById(id): Observable<Cliente> {
    const suffix = '/' + id.toString();
    return this.http.get<Cliente>(this.ENDPOINT + suffix)
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.ENDPOINT, cliente, {headers: this.httpHeaders})
  }

  update(cliente: Cliente): Observable<Cliente> {
    const suffix = '/' + cliente.id.toString();
    return this.http.put<Cliente>(this.ENDPOINT + suffix, cliente, {headers: this.httpHeaders});
  }

  deleteById(id): Observable<any> {
    const suffix = '/' + id.toString();
    return this.http.delete(this.ENDPOINT + suffix);
  }
}
