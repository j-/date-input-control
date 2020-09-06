import { createDateInputControlPart } from './create-date-input-control-part';

export const createDateInputControl = (inputs: ArrayLike<HTMLInputElement>) => {
  const callbacks = Array.from(inputs).map((input, i, inputs) => (
    createDateInputControlPart(inputs[i - 1], input, inputs[i + 1])
  ));
  return () => callbacks.forEach((fn) => fn());
};
