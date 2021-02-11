// Package imports
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocked } from 'ts-jest/utils';
// Components/actions
import App from './App';
import CustomInput from './CustomInput';
import { getUser } from './get-user';

describe('When everything is OK', () => {
it('should call the onChange callback handler when using the fireEvent function', () => {
    const onChange = jest.fn();
    render(
      <CustomInput value="" onChange={onChange}>
        Input:
      </CustomInput>
    );
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'David' },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
it('should call the onChange callback handler when using the userEvent API', async () => {
    const onChange = jest.fn();
    render(
      <CustomInput value="" onChange={onChange}>
        Input:
      </CustomInput>
    );
    userEvent.type(screen.getByRole('textbox'), 'David');

    expect(onChange).toHaveBeenCalledTimes(5);
  });
});