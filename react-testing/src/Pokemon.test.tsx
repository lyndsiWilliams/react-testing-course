import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Pokemon from './Pokemon';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('When the user enters a valid pokemon name', () => {
  it('should show the pokemon abilities of that pokemon', async () => {
    const abilities = [
      {
        ability: {
          name: 'Test ability 1',
          url: 'https://ability.com/ability1',
        },
      },
      {
        ability: {
          name: 'Test ability 2',
          url: 'https://ability.com/ability2',
        },
      }
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: { abilities } });
    render(<Pokemon />);
    await userEvent.type(screen.getByRole('textbox'), 'ditto');
    await userEvent.click(screen.getByRole('button'));
    const returnedAbilities = await screen.findAllByRole('listitem');
    expect(returnedAbilities).toHaveLength(2);
  });
});

describe('When the user enters an invalid pokemon name', () => {
  it('should show an error message on the screen', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error());
    render(<Pokemon />);
    await userEvent.type(screen.getByRole('textbox'), 'invalid-pokemon-name');
    await userEvent.click(screen.getByRole('button'));
    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  })
})