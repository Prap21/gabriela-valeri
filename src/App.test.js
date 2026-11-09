import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';
import { CartProvider } from './Context/CartContext';

test('renders the store menu', async () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </MemoryRouter>
  );

  expect(await screen.findByText(/menu/i)).toBeTruthy();
});
