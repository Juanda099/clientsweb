import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client } from '../model/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private http = inject(HttpClient);

  list() {
    return this.http.get<Client[]>('http://localhost:8080/api/clients');
  }

  get(id: number) {
    return this.http.get<Client>(`http://localhost:8080/api/clients/${id}`);
  }

  create(client: any) {
    return this.http.post<Client>('http://localhost:8080/api/clients', client);
  }

  update(id: number, client: Client) {
    return this.http.put<Client>(`http://localhost:8080/api/clients/${id}`, client);
  }

  delete(id: number) {
    return this.http.delete<void>(`http://localhost:8080/api/clients/${id}`);
  }
}

