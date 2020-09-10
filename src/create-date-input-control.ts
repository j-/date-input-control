import { createDateInputControlPart } from './create-date-input-control-part';
import { Listeners, addListeners } from './listeners';

export interface Options extends Partial<Listeners> {}

export const createDateInputControl = (inputs: ArrayLike<HTMLInputElement>, options?: Options) => {
  const callbacks = Array.from(inputs).map((input, i, inputs) => (
    createDateInputControlPart(inputs[i - 1], input, inputs[i + 1])
  ));
  if (options) callbacks.push(addListeners(inputs, options));
  return () => callbacks.forEach((fn) => fn());
};
