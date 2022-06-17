import { createDateInputControlPart } from './create-date-input-control-part';
import { Listeners, addListeners } from './listeners';
import { createPasteHandler } from './paste';

export interface Options extends Partial<Listeners> {}

export interface CreateDateInputControl {
  (inputs: ArrayLike<HTMLInputElement>, options?: Options): VoidFunction;
}

export const createDateInputControl: CreateDateInputControl = (inputs, options) => {
  const nonNullInputs = Array.from(inputs).filter((input) => input != null);
  const callbacks: VoidFunction[] = [];
  for (let i = 0; i < nonNullInputs.length; i++) {
    const input = nonNullInputs[i];
    callbacks.push(
      createDateInputControlPart(
        nonNullInputs[i - 1],
        input,
        nonNullInputs[i + 1]
      )
    );
    callbacks.push(
      createPasteHandler(
        input,
        nonNullInputs.slice(i)
      )
    );
  }
  if (options) callbacks.push(addListeners(nonNullInputs, options));
  return () => callbacks.forEach((fn) => fn());
};
