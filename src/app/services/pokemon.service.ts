import { Injectable } from '@angular/core';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { forkJoin, Observable, Subject } from 'rxjs';
import { Ability } from '../models/ability';
import { Pokelist } from '../models/Pokelist';

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

  getPokemons() {
    return this.filteredPokemons;
  }

  getEvolutionChain(name: string): Observable<any> {
    return this.http
      .get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
      .pipe(
        mergeMap((pokemonSpecies: any) =>
          this.http.get(pokemonSpecies.evolution_chain.url),
        ),
      );
  }

  getAbility(url: string): Observable<Ability> {
    return this.http.get<Ability>(url);
  }

  search(term: string) {
    const regex = /\?/gm;
    if (term.trim() === '') {
      this.pokemons.subscribe((data: Pokemon[]) =>
        this.filteredPokemons.next(data),
      );
    } else if (regex.test(term) || term === 'missingno') {
      const missingno: Pokemon[] = [
        {
          abilities: [
            {
              ability: { name: '????', url: '???' },
              is_hidden: false,
              slot: 9999,
            },
          ],
          base_experience: 0,
          forms: [{ name: '???', url: '???' }],
          game_indices: [
            { game_index: 0, version: { name: '???', url: '???' } },
          ],
          height: 0,
          held_items: [],
          id: 0,
          is_default: false,
          location_area_encounters: [],
          moves: [
            { move: { name: '???', url: '???' }, version_group_details: [] },
          ],
          name: 'missingno',
          order: 0,
          species: { name: '???', url: '???' },
          stats: [],
          sprites: {
            back_default: 'assets/missingno.png',
            back_shiny: 'assets/missingno.png',
            front_default: 'assets/missingno.png',
            front_shiny: 'assets/missingno.png',
          },
          types: [],
          weight: 0,
        },
      ];

      this.filteredPokemons.next(missingno);
    } else {
      this.pokemons
        .pipe(
          map((pokemons: Pokemon[]) =>
            pokemons.filter(
              (pokemon) => pokemon.name.indexOf(term.toLowerCase()) !== -1,
            ),
          ),
        )
        .subscribe((data: Pokemon[]) => this.filteredPokemons.next(data));
    }
  }

  getAllPokemon() {
    const url = `https://pokeapi.co/api/v2/`;

    return this.http.get<Pokelist>(url + 'pokemon/?offset=0&limit=25').pipe(
      map((data: any) => {
        return data.results;
      }),
      switchMap((data) =>
        forkJoin(data.map((pokemon) => this.http.get<Pokemon>(pokemon.url))),
      ),
    );
  }
}
