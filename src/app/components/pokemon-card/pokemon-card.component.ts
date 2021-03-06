import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';

import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @ViewChild('evolutionText', { static: false }) evolutionTextRef: ElementRef;
  @ViewChild('carouselElement', { static: true })
  carouselElement: NgbCarousel;

  evolveFrom: string;
  evolutionChain: string[] = [];
  carousel: string[] = [];

  constructor(
    private modalService: NgbModal,
    private pokemonService: PokemonService,
  ) {}

  ngOnInit() {
    this.carouselElement.pause();
    this.fillCarousel();
    this.pokemonService
      .getEvolutionChain(this.pokemon.name)
      .subscribe((evolutionChain) => {
        this.evolutionChain.push(evolutionChain.chain.species.name);
        if (evolutionChain.chain.evolves_to.length > 0) {
          this.evolutionChain.push(
            evolutionChain.chain.evolves_to['0'].species.name,
          );

          if (
            evolutionChain.chain.evolves_to['0'].species.name ===
            this.pokemon.name
          ) {
            this.evolveFrom = `Evolve from ${this.capitalizeFirstLetter(
              evolutionChain.chain.species.name,
            )}`;
          }

          if (evolutionChain.chain.evolves_to['0'].evolves_to.length > 0) {
            this.evolutionChain.push(
              evolutionChain.chain.evolves_to['0'].evolves_to['0'].species.name,
            );

            if (
              evolutionChain.chain.evolves_to['0'].evolves_to['0'].species
                .name === this.pokemon.name
            ) {
              this.evolveFrom = `Evolve from ${this.capitalizeFirstLetter(
                evolutionChain.chain.evolves_to['0'].species.name,
              )}`;
            }
          }
        }
      });
  }

  fillCarousel() {
    this.carousel.push(
      this.pokemon.sprites.front_default,
      this.pokemon.sprites.back_default,
      this.pokemon.sprites.front_shiny,
      this.pokemon.sprites.back_shiny,
    );
    if (this.pokemon.sprites.front_female) {
      this.carousel.push(this.pokemon.sprites.front_female);
    }
    if (this.pokemon.sprites.back_female) {
      this.carousel.push(this.pokemon.sprites.back_female);
    }
    if (this.pokemon.sprites.front_shiny_female) {
      this.carousel.push(this.pokemon.sprites.front_shiny_female);
    }
    if (this.pokemon.sprites.back_shiny_female) {
      this.carousel.push(this.pokemon.sprites.back_shiny_female);
    }
  }

  capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  open() {
    const modalRef = this.modalService.open(PokemonDetailsComponent, {
      windowClass: 'animated zoomIn',
    });
    modalRef.componentInstance.pokemon = this.pokemon;
    modalRef.componentInstance.evolutionChain = this.evolutionChain;
  }
}
