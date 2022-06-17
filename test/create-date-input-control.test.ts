import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { createDateInputControl } from '../src/create-date-input-control';
import '@testing-library/jest-dom';

describe('two fields', () => {
  let cleanup: () => void;
  let mm: HTMLInputElement;
  let yyyy: HTMLInputElement;

  beforeEach(() => {
    const template = `
      <fieldset role="group">
        <legend>Credit card expiry</legend>
        <input
          type="text"
          maxlength="2"
          data-testid="mm"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <input
          type="text"
          maxlength="4"
          data-testid="yyyy"
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </fieldset>
    `;
    const container = document.createElement('div');
    container.innerHTML = template;
    document.body.appendChild(container);
    mm = screen.getByTestId<HTMLInputElement>('mm');
    yyyy = screen.getByTestId<HTMLInputElement>('yyyy');
    const unsubscribe = createDateInputControl([mm, yyyy]);
    cleanup = () => {
      unsubscribe();
      document.body.removeChild(container);
    };
  });

  afterEach(() => {
    cleanup();
  });

  it('moves focus to year field when month field is full', async () => {
    await userEvent.type(mm, '05');
    expect(mm).toHaveValue('05');
    expect(yyyy).toHaveValue('');
    expect(yyyy).toHaveFocus();
  });

  it('continues typing in year field when month field is full', async () => {
    await userEvent.type(mm, '052030');
    expect(mm).toHaveValue('05');
    expect(yyyy).toHaveValue('2030');
    expect(yyyy).toHaveFocus();
  });

  it('moves focus when pressing arrow keys', async () => {
    await userEvent.type(mm, '{arrowright}');
    expect(yyyy).toHaveFocus();
    await userEvent.type(yyyy, '{arrowleft}');
    expect(mm).toHaveFocus();
  });

  it('moves focus when typing a slash', async () => {
    await userEvent.type(mm, '1/1900');
    expect(mm).toHaveValue('1');
    expect(yyyy).toHaveValue('1900');
    expect(yyyy).toHaveFocus();
  });

  it('moves focus when typing a period', async () => {
    await userEvent.type(mm, '1.1900');
    expect(mm).toHaveValue('1');
    expect(yyyy).toHaveValue('1900');
    expect(yyyy).toHaveFocus();
  });

  it('moves focus when typing a comma', async () => {
    await userEvent.type(mm, '1,1900');
    expect(mm).toHaveValue('1');
    expect(yyyy).toHaveValue('1900');
    expect(yyyy).toHaveFocus();
  });

  it('can backspace to previous field', async () => {
    await userEvent.type(mm, '99{backspace}{backspace}{backspace}1');
    expect(mm).toHaveValue('1');
    expect(mm).toHaveFocus();
  });

  it('can delete to next field', async () => {
    await userEvent.type(yyyy, '3020');
    await userEvent.type(mm, '01{delete}{delete}2');
    expect(mm).toHaveValue('01');
    expect(yyyy).toHaveValue('2020');
    expect(yyyy).toHaveFocus();
  });

  it('handles pasting data without separator', async () => {
    mm.focus();
    await userEvent.paste('123456');
    expect(mm).toHaveValue('12');
    expect(yyyy).toHaveValue('3456');
    expect(yyyy).toHaveFocus();
  });

  it('handles pasting data with separator', async () => {
    mm.focus();
    await userEvent.paste('12/3456');
    expect(mm).toHaveValue('12');
    expect(yyyy).toHaveValue('3456');
    expect(yyyy).toHaveFocus();
  });
});
