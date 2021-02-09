import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { getUser } from './get-user';
import { mocked } from 'ts-jest/utils';

jest.mock('./get-user');
// 'true' in mocked() means that this will do a deep clone of the function
const mockGetUser = mocked(getUser, true);

describe('When everything is OK', () => {
  beforeEach(async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());
  });

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

describe('When the component fetches the user successfully', () => {
  beforeEach(() => {
    mockGetUser.mockClear();
  });

  it('should call getUser once', async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1));
  });
});
