import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

test('renders the Login component without crashing', () => {
  const { getByText } = render(<Login />);
});