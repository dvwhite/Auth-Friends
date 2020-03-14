import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

test('renders the Header component without crashing', () => {
  const { getByText } = render(<Header />);
});