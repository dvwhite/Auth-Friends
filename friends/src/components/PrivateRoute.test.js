import React from 'react';
import { render } from '@testing-library/react';
import PrivateRoute from './PrivateRoute';

test('renders the PrivateRoute component without crashing', () => {
  const { getByText } = render(<PrivateRoute />);
});
