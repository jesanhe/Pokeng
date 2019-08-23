import { Injectable } from '@angular/core';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  baseURL: 'https://pokeapi.co/api/v2/';
  pokemons: Pokemon[];

  constructor(private http: HttpClient) {
    // this.getAllPokemon().toPromise().then((pokeList) => {
    //   pokeList.map((poke) => {
    //     console.log('poke', poke);
    //     http.get(poke.url).toPromise().then(data => console.log(data));
    //   });
    // });
  }

  getQueries(query: string) {
    const url = `https://pokeapi.co/api/v2/${query}`;

    return this.http.get(url);
  }

  getAllPokemon() {
    return this.getQueries('pokemon/?offset=0&limit=25').pipe(
      map((data: any) => {
        return data.results;
      }),
      switchMap((data) =>
        forkJoin(data.map((pokemon) => this.http.get(pokemon.url))),
      ),
    );
  }
}
