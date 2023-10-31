

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PokemonControllerService {
  public pokemons$ = new BehaviorSubject([])
  public countPokemon$ = new BehaviorSubject(0)

  public showPokemons$ = new BehaviorSubject([]);
  public letterCountPokemons$:BehaviorSubject<any> = new BehaviorSubject([]);


  public selectedPokemon$:BehaviorSubject<any> = new BehaviorSubject(null);


  public countPokemonByLetter(data:any) {

    let words  = data.map((pokemon:any) => pokemon.name).sort();

    // Objeto para mantener el conteo de ocurrencias
    let countByLetter:any = {};

    let countByLetterFinal:any = [];

    // Inicializa el objeto con ceros para cada letra del alfabeto
    for (const str of words) {
      const firstLetter = str.charAt(0).toLowerCase();
      countByLetter[firstLetter] = (countByLetter[firstLetter] || 0) + 1;
    }






    // console.log(countByLetter);
    for (const letter in countByLetter) {
      countByLetterFinal = [
        ...countByLetterFinal,
        {
          letter,
          count: countByLetter[letter]
        }
      ]
    }
    this.letterCountPokemons$.next([...countByLetterFinal]);
  }




}
