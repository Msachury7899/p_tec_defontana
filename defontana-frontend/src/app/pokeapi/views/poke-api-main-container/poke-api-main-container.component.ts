import { Component, OnInit } from '@angular/core';
import { PokemonControllerService } from '../../controllers/pokemon.controller.service';

@Component({
  selector: 'app-poke-api-main-container',
  templateUrl: './poke-api-main-container.component.html',
  styleUrls: ['./poke-api-main-container.component.scss']
})
export class PokeApiMainContainerComponent implements OnInit {

  constructor(private pokemonController:PokemonControllerService) { }
  selectedPokemon = this.pokemonController.selectedPokemon$;

  ngOnInit(): void {
  }

}
