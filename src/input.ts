export const isInputEmpty = (input: HTMLInputElement) => (
  input.value.length === 0
);

export const isInputFull = (input: HTMLInputElement) => (
  input.value.length >= input.maxLength
);
