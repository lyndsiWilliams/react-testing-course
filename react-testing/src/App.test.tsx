import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('When everything is OK', () => {
  it('should render the App component without crashing', () => {
    render(<App />);
    screen.debug();
  });

  it('should select the children that are being passed to the CustomInput component', () => {
    render(<App />);
    screen.getByText(/Input/);
  });
});
