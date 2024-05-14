import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = "https://jsonplaceholder.typicode.com/users";

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  constructor(private http: HttpClient) { }

  TraerUsuarios(usuario: string) {
    return this.http.get<UsuarioResponse[]>(`${API_URL}?username=${usuario}`);
  }

}