import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Pokedex } from '../components';
import data from '../data';
import renderWithRouter from './helpers/renderWithRouter';

describe('Pokedex component', () => {
  const favorites = () => data
    .reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {});

  test('Teste se página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<Pokedex
        isPokemonFavoriteById={ favorites() }
        pokemons={ data }
      />);

      screen.getByRole('heading', { name: /Encountered pokémons/i });
    });

  test(`Teste se é exibido o próximo Pokémon da lista quando o botão 
  Próximo pokémon é clicado.`, () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ favorites() }
      pokemons={ data }
    />);
    data.forEach((item) => {
      screen.getByText(item.name);
      const next = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(next);
    });
    screen.getByText('Pikachu');
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ favorites() }
      pokemons={ data }
    />);
    data.forEach(() => {
      const pokemon = screen.getAllByTestId('pokemon-name');
      expect(pokemon.length).toBe(1);
      const next = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(next);
    });
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ favorites() }
      pokemons={ data }
    />);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    types.forEach((item) => {
      const filter = screen.getByRole('button', { name: item });
      userEvent.click(filter);
      const pokemonFiltered = data.filter((value) => value.type === item);
      const next = screen.getByRole('button', { name: /Próximo pokémon/i });
      pokemonFiltered.forEach((value) => {
        screen.getByText(value.name);
        const aux = screen.getAllByText(value.type);
        expect(aux.length).toBe(2);
        screen.getByRole('button', { name: /all/i });
        userEvent.click(next);
      });
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro ', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ favorites() }
      pokemons={ data }
    />);
    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    userEvent.click(screen.getByRole('button', { name: 'All' }));

    data.forEach((value) => {
      screen.getByText(value.name);
      const next = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(next);
    });
  });
  test('A quantidade de filtros disponiveis', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ favorites() }
      pokemons={ data }
    />);
    const filters = screen.getAllByTestId('pokemon-type-button');
    const magicNumber = 7;
    expect(filters.length).toBe(magicNumber);
  });
});
