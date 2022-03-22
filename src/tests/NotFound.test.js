import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from './helpers/renderWithRouter';

describe('Notfound component', () => {
  test(`Teste se página contém um heading h2 com o texto Page requested 
  not found 😭;`, () => {
    renderWithRouter(<NotFound />);
    screen.getByRole('heading', { name: /page requested not found/i });
    screen.getByRole('img', { name: /crying emoji/i });
  });
  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(img.src).toEqual(url);
  });
});
