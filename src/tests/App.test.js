import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

test('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);
  const home = screen.getByRole('link', { name: /home/i });
  const about = screen.getByRole('link', { name: /about/i });
  const favorite = screen.getByRole('link', { name: /favorite/i });
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
});

test(`Se a aplicação é redirecionada para a página inicial, 
na URL / ao clicar no link Home da barra de navegação`, () => {
  const { history } = renderWithRouter(<App />);
  const url = '/';
  userEvent.click(screen.getByRole('link', { name: /home/i }));
  expect(history.location.pathname).toBe(url);
  history.push('about');
  userEvent.click(screen.getByRole('link', { name: /home/i }));
  expect(history.location.pathname).toBe(url);
  history.push('favorites');
  userEvent.click(screen.getByRole('link', { name: /home/i }));
  expect(history.location.pathname).toBe(url);
});

test(`Se a aplicação é redirecionada para a página de Pokémons 
Favoritados, na URL /favorites ao clicar no link Home da barra de navegação`, () => {
  const { history } = renderWithRouter(<App />);
  const url = '/favorites';
  userEvent.click(screen.getByRole('link', { name: /favorite/i }));
  expect(history.location.pathname).toBe(url);
  history.push('about');
  userEvent.click(screen.getByRole('link', { name: /favorite/i }));
  expect(history.location.pathname).toBe(url);
  history.push('favorites');
  userEvent.click(screen.getByRole('link', { name: /favorite/i }));
  expect(history.location.pathname).toBe(url);
});

test(`Se a aplicação é redirecionada para a página About, 
na URL /about ao clicar no link Home da barra de navegação`,
() => {
  const { history } = renderWithRouter(<App />);
  const url = '/about';
  userEvent.click(screen.getByRole('link', { name: /about/i }));
  expect(history.location.pathname).toBe(url);
  history.push('about');
  userEvent.click(screen.getByRole('link', { name: /about/i }));
  expect(history.location.pathname).toBe(url);
  history.push('favorites');
  userEvent.click(screen.getByRole('link', { name: /about/i }));
  expect(history.location.pathname).toBe(url);
});

test(`Teste se a aplicação é redirecionada para a página
 Not Found ao entrar em uma URL desconhecida.`,
() => {
  const { history } = renderWithRouter(<App />);
  const url = '/not-found';
  history.push(url);
  screen.getByRole('heading', { name: /page requested not found/i,
    level: 2 });
});
