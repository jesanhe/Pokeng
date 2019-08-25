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
import { Ability } from '../models/ability';

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

  getEvolutionChain(name: string): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`).pipe(
      mergeMap((pokemonSpecies: any) => this.http.get(pokemonSpecies.evolution_chain.url))
    );
  }

  getAbility(url: string): Observable<any> {
    return this.http.get(url);
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
