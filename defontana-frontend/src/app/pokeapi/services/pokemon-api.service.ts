import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable()
export class PokemonApiService {

  constructor(private httpClient: HttpClient) { }


  getTotalPokemons(){
    return this.httpClient.get("https://pokeapi.co/api/v2/pokemon").pipe(
      map( (pokemon:any) => pokemon.count)
    );
  }


  getPokemonDetailById(id:number | string){
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      map(( response:any) => {
        let newResponse = {
          img: response.sprites.other["official-artwork"].front_default,
          name: response.name,
          height: response.height,
          weight: response.weight,
          base_experience: response.base_experience,
          types : response.types.map( (typePokemon:any) => {
            return {
              name: typePokemon.type.name
            }
          })
        }
        return {
          ...newResponse,
        };
      })
    )
  }

  getAllPokemons(count:number){
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon?&limit=${count}`).pipe(
      map(( response:any) => {
        response.results = [...response.results.map((pokemon:any) => {
          let values = pokemon.url.split('/');
          return {
            ...pokemon,
            pokedex:  values[values.length - 2]
          }
        })];
        return {
          ...response,
        };
      })
    )
  }



}
