import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HangmanService {
  constructor(
    private http: HttpClient
  ) { }

  getPalabra(){
    return this.http.get<string>('https://clientes.api.greenborn.com.ar/public-random-word',
    {
      responseType:'json'
    });
  }
}
