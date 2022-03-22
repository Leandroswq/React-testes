import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../components';
import data from '../data';
import renderWithRouter from './helpers/renderWithRouter';

describe('FavoritesPokemons component', () => {
  test(`Teste se é exibido na tela a mensagem No favorite pokemon found,
  se a pessoa não tiver pokémons favoritos.`,
  () => {
    renderWithRouter(<FavoritePokemons />);
    screen.getByText(/No favorite pokemon found/i);
  });

  test('Teste se é exibido todos os cards de pokémons favoritados. ', () => {
    const positionStart = 3;
    const positionEnd = 6;
    const pokemons = data.slice(positionStart, positionEnd);
    console.log(pokemons);
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    screen.getByText(/ekans/i);
    screen.getByText(/Alakazam/i);
    screen.getByText(/Mew/i);
    const psy = screen.getAllByText(/Psychic/i);
    expect(psy.length).toBe(2);
    const poison = screen.getAllByText(/Poison/i);
    expect(poison.length).toBe(1);
  });
});
