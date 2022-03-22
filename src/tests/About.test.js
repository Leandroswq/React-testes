import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../components';
import renderWithRouter from './helpers/renderWithRouter';

describe('testes do componente About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const text1 = /This application simulates a Pokédex/i;
    const text2 = /One can filter Pokémons by type, and see more details/i;
    screen.getByText(text1);
    screen.getByText(text2);
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
  });
  test(`Teste se a página contém a seguinte imagem de uma Pokédex: 
  https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`,
  () => {
    renderWithRouter(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img.src).toBe(url);
  });
});
