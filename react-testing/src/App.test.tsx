import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('When everything is OK', () => {
  beforeEach(() => {
    render(<App />);
  })
  it('should render the App component without crashing', () => {
    screen.debug();
  });

  it('should select the children that are being passed to the CustomInput component', () => {
    screen.getByText(/Input/);
  });

  it('should select the input element by its role', () => {
    screen.getByRole('textbox');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should select a label element by its text', () => {
    screen.getByLabelText('Input:');
  });

  it('should select input element by placeholder text', () => {
    screen.getByPlaceholderText('Example');
  });

  it('should not find the role "whatever" in component', () => {
    expect(screen.queryByRole('whatever')).toBeNull();
    // const result = screen.queryByRole('textbox');
    // console.log(result);
    // expect(result).toBeInTheDocument();
  });
});
