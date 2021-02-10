import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    console.log('first');
    screen.debug();
  });

  it('should select the children that are being passed to the CustomInput component', () => {
    screen.getAllByText(/Input/);
  });

  it('should select the input element by its role', () => {
    screen.getAllByRole('textbox');
    expect(screen.getAllByRole('textbox')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('textbox').length).toEqual(1);
  });

  it('should select a label element by its text', () => {
    // If two labels have the same name, RTL considers it 1 label
    screen.getByLabelText('Input:');
  });

  it('should select input element by placeholder text', () => {
    screen.getAllByPlaceholderText('Example');
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

  it('should render the username passed', async () => {
    const name = 'John';
    // mockGetUser.mockImplementationOnce(() =>
    //   Promise.resolve({ id: '1', name: 'John' })
    // );
    // The above code does the same as the line below
    mockGetUser.mockResolvedValueOnce({ id: '1', name });
    render(<App />);
    expect(screen.queryByText(/Username/)).toBeNull();
    expect(await screen.findByText(`Username: ${name}`)).toBeInTheDocument();
  });
});

describe('When the user enters some text in the input element', () => {
  it('should display the text on the screen', async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());

    expect(screen.getByText(/You typed: .../));

    // --- Using fireEvent ---
    // fireEvent.change(screen.getByRole('textbox'), {
    //   target: { value: 'David' },
    // });
    // --- Using userEvent ---
    await userEvent.type(screen.getByRole('textbox'), 'David');

    expect(screen.getByText(/You typed: David/));
  });
});
