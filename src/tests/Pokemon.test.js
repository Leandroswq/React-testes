import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Pokemon } from '../components';
import data from '../data';
import renderWithRouter from './helpers/renderWithRouter';

describe('Pokemon component', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon.',
    () => {
      renderWithRouter(<Pokemon
        pokemon={ data[0] }
        isFavorite
      />);
      screen.getByText(data[0].name);
      screen.getByText(data[0].type);
      const weightValue = data[0].averageWeight.value;
      const weightmeasurementUnit = data[0].averageWeight.measurementUnit;
      const weight = `Average weight: ${weightValue} ${weightmeasurementUnit}`;
      screen.getByText(weight);
      const img = screen.getByRole('img', { name: `${data[0].name} sprite` });
      expect(img.src).toBe(data[0].image);
    });

  test(`Teste se o card do Pokémon indicado na Pokédex contém um link de 
  navegação para exibir detalhes deste Pokémon. O link deve possuir a 
  URL /pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {
    renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite
    />);
    const link = screen.getByRole('link', { name: /more details/i });
    const url = new RegExp(`pokemons/${data[0].id}$`);
    expect(url.test(link.href)).toBeTruthy();
  });

  test(`Teste se ao clicar no link de navegação do Pokémon, é feito o 
  redirecionamento da aplicação para a página de detalhes de Pokémon`, () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite
    />);
    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);
    const url = (`/pokemons/${data[0].id}`);
    expect(url).toBe(history.location.pathname);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite
    />);
    const star = screen
      .getByRole('img', { name: `${data[0].name} is marked as favorite` });
    expect(/\/star-icon.svg/.test(star.src)).toBeTruthy();
  });
});
