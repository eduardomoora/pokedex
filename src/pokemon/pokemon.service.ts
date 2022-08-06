import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      // const pokemon = await this.pokemonModel.create(createPokemonDto);
      const createPokemon = new this.pokemonModel(createPokemonDto);

      return createPokemon.save();
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException(`Pokemon already exist in the database`);
      }
      throw new InternalServerErrorException(`Cannot create Pokemon`);
    }
  }

  async findAll() {
    try {
      const pokemons = await this.pokemonModel.find();
      return pokemons;
    } catch (err) {
      throw new InternalServerErrorException(`Something went wrong try again`);
    }
  }
  async findOne(term: string) {
    try {
      const pokemon: Pokemon = await this.pokemonModel.findOne({ id: term });

      if (!pokemon) {
        throw new NotFoundException();
      }
      return pokemon;
    } catch (err) {
      if (err.status === 404) throw new NotFoundException();
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemonUpdated = await this.pokemonModel.findByIdAndUpdate(
        id,
        updatePokemonDto,
        { new: true },
      );

      if (!pokemonUpdated) {
        throw new NotFoundException();
      }
      return pokemonUpdated;
    } catch (err) {
      if (err.code === 404) throw new NotFoundException();
    }
  }

  async remove(id: string) {
    return this.pokemonModel.findByIdAndRemove(id);
  }
}
