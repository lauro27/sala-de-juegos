import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TriviaOption } from '../interfaces/trivia-option';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemon(dex:number){
    return this.http.get<string>('https://pokeapi.co/api/v2/pokemon-form/' + dex.toString(),
    {
      responseType:'json'
    });
  }
}
