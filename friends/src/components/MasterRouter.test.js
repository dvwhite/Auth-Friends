import React from 'react';
import { render } from '@testing-library/react';
import MasterRouter from './MasterRouter';

test('renders the MasterRouter component without crashing', () => {
  const { getByText } = render(<MasterRouter />);
});
