import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { PokemonDetails } from '../components';
import data from '../data';
import renderWithRouter from './helpers/renderWithRouter';

describe('PokemonDetails component', () => {
  const isPokemonFavoriteById = {};
  data.forEach(({ id }) => {
    isPokemonFavoriteById[id] = true;
  });
  const onUpdateFavoritePokemons = (id) => {
    isPokemonFavoriteById[id] = !isPokemonFavoriteById[id];
  };
  beforeEach(() => {
    const keys = Object.keys(isPokemonFavoriteById);
    keys.forEach((item) => {
      isPokemonFavoriteById[item] = true;
    });
  });
  test(`Teste se as informações detalhadas do Pokémon selecionado são 
  mostradas na tela.`, () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ { params: { id: `${data[0].id}` } } }
      onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
      pokemons={ data }
    />);
    screen.getByRole('heading', { name: `${data[0].name} Details`, level: 2 });
    expect(screen.queryAllByRole('link', { name: /more details/i }).length).toBeFalsy();
    screen.getByRole('heading', { name: /summary/i, level: 2 });
    screen.getByText(data[0].summary);
  });

  test(`Teste se existe na página uma seção com os mapas contendo as 
  localizações do pokémon`, () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ { params: { id: `${data[0].id}` } } }
      onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
      pokemons={ data }
    />);
    screen.getByRole('heading', { name: `Game Locations of ${data[0].name}`, level: 2 });
    data[0].foundAt.forEach((item) => {
      screen.getByText(item.location);
    });
    const img = screen.getAllByRole('img', { name: `${data[0].name} location` });
    expect(img.length).toBe(data[0].foundAt.length);
    img.forEach(({ src }) => expect(data[0].foundAt.some((item) => item.map === src))
      .toBeTruthy());
  });

  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ { params: { id: `${data[0].id}` } } }
        onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
        pokemons={ data }
      />);
      const checkbox = screen.getByRole('checkbox', {
        name: /pokémon favoritado\?/i,
      });
      screen.getByRole('img', {
        name: `${data[0].name} is marked as favorite`,
      });
      userEvent.click(checkbox);
    });
  const favorite = screen.queryAllByRole('img', {
    name: `${data[0].name} is marked as favorite`,
  });
  expect(favorite.length).toBe(0);
});
