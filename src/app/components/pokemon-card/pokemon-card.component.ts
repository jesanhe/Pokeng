import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon;

  evolveFrom: string;

  evolutionChain: string[] = [];

  constructor(
    private modalService: NgbModal,
    private pokemonService: PokemonService,
  ) {}

  ngOnInit() {
    console.log(this.pokemon);
    this.pokemonService
      .getEvolutionChain(this.pokemon.name)
      .subscribe((evolutionChain) => {
        console.log('evolution', evolutionChain);
        // if(evolutionChain.chain.evolves_to.length > 0) {
        //   if(evolutionChain.chain.species.name === this.pokemon.name) {
        //     this.evolveTo = evolutionChain.chain.evolves_to['0'].species.name;

        //   }
        // }
        // this.evolveFrom = evolutionChain.chain.evolves_to['0'].species.name;
        this.evolutionChain.push(evolutionChain.chain.species.name);
        if (evolutionChain.chain.evolves_to.length > 0) {
          this.evolutionChain.push(
            evolutionChain.chain.evolves_to['0'].species.name,
          );

          if (
            evolutionChain.chain.evolves_to['0'].species.name ===
            this.pokemon.name
          ) {
            this.evolveFrom = evolutionChain.chain.species.name;
          }

          if (evolutionChain.chain.evolves_to['0'].evolves_to.length > 0) {
            this.evolutionChain.push(
              evolutionChain.chain.evolves_to['0'].evolves_to['0'].species.name,
            );

            if (
              evolutionChain.chain.evolves_to['0'].evolves_to['0'].species
                .name === this.pokemon.name
            ) {
              this.evolveFrom =
                evolutionChain.chain.evolves_to['0'].species.name;
            }
          }
        }
      });
  }

  open() {
    const modalRef = this.modalService.open(PokemonDetailsComponent, {
      windowClass: 'animated zoomIn',
    });
    modalRef.componentInstance.pokemon = this.pokemon;
    modalRef.componentInstance.evolutionChain = this.evolutionChain;
  }
}
