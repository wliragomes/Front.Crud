import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Cliente from '../models/Cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clienteApiUrl = 'https://localhost:7143/api/Cliente'
  constructor(private http: HttpClient) { }

  createCliente(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.clienteApiUrl, {
      cpf: cliente.cpf,
      nome: cliente.nome,
      email: cliente.email
    });
  }
  
  updateCliente(cliente: Cliente) : Observable<Cliente> {
    return this.http.put<Cliente>(this.clienteApiUrl, cliente);
  }

  deleteCliente(id: string) {
    return this.http.delete(`${this.clienteApiUrl}/${id}`);
  }
  
  getCliente() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.clienteApiUrl);
  }

}
