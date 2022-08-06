import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { DataService } from '../common/services/data/data.service';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  constructor(
    private pokemonService: PokemonService,
    private dataService: DataService,
  ) {}

  async executeSeed() {
    try {
      const res = await this.dataService.get<PokeResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=500&offset=0',
      );
      console.log(res);
      const newData = res.results.map((item, index) => {
        return { name: item.name, no: ++index };
      });
      await this.pokemonService.insertSeed(newData);
      return newData;
    } catch (err) {}
  }
}
