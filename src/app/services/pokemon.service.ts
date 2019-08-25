import { Injectable } from '@angular/core';
import {
  map,
  mergeMap,
  switchMap,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { forkJoin, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemons;
  filteredPokemons = new Subject<Pokemon[]>();

  constructor(private http: HttpClient) {
    this.pokemons = this.getAllPokemon();
    this.pokemons.subscribe((data: Pokemon[]) =>
      this.filteredPokemons.next(data),
    );
  }

  getQueries(query: string) {
    const url = `https://pokeapi.co/api/v2/${query}`;

    return this.http.get(url);
  }

  getPokemons() {
    return this.filteredPokemons;
  }

  updatePokemons(pokemons) {
    this.pokemons = pokemons;
  }

  search(term: string) {
    if (term.trim() === '') {
      this.pokemons.subscribe((data: Pokemon[]) =>
        this.filteredPokemons.next(data),
      );
    } else {
      this.pokemons
        .pipe(
          map((pokemons: Pokemon[]) =>
            pokemons.filter((pokemon) => pokemon.name.indexOf(term.toLowerCase()) !== -1),
          ),
          // catchError((err) => {
          //   console.error(err);
          //   return of('');
          // }),
        )
        .subscribe((data: Pokemon[]) => this.filteredPokemons.next(data));
    }
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
