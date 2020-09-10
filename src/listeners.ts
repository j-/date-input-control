export interface Listeners {
  onBlurAll: (event: FocusEvent) => void;
  onBlurAllCapture: (event: FocusEvent) => void;
  onFocusOutAll: (event: FocusEvent) => void;
  onFocusOutAllCapture: (event: FocusEvent) => void;
  onChangeAny: (event: Event) => void;
  onChangeAnyCapture: (event: Event) => void;
  onInputAny: (event: Event) => void;
  onInputAnyCapture: (event: Event) => void;
}

const includes = <T>(items: T[], searchElement: T, fromIndex?: number) => (
  items.indexOf(searchElement, fromIndex) > -1
);

const CAPTURE = { capture: true };
const BUBBLE = { capture: false };

export const addListeners = (allInputs: ArrayLike<HTMLInputElement>, listeners: Partial<Listeners>) => {
  const inputs = Array.from(allInputs);
  const callbacks: (() => void)[] = [];

  const {
    onBlurAll, onBlurAllCapture,
    onFocusOutAll, onFocusOutAllCapture,
    onChangeAny, onChangeAnyCapture,
    onInputAny, onInputAnyCapture,
  } = listeners;

  if (onBlurAll) {
    for (const input of inputs) {
      const handler = (e: FocusEvent) => {
        if (includes(inputs, e.relatedTarget)) return;
        onBlurAll(e);
      };
      input.addEventListener('blur', handler, BUBBLE);
      callbacks.push(() => input.removeEventListener('blur', handler, BUBBLE));
    }
  }

  if (onBlurAllCapture) {
    for (const input of inputs) {
      const handler = (e: FocusEvent) => {
        if (includes(inputs, e.relatedTarget)) return;
        onBlurAllCapture(e);
      };
      input.addEventListener('blur', handler, CAPTURE);
      callbacks.push(() => input.removeEventListener('blur', handler, CAPTURE));
    }
  }

  if (onFocusOutAll) {
    for (const input of inputs) {
      const handler = (e: FocusEvent) => {
        if (includes(inputs, e.relatedTarget)) return;
        onFocusOutAll(e);
      };
      input.addEventListener('focusout', handler, BUBBLE);
      callbacks.push(() => input.removeEventListener('focusout', handler, BUBBLE));
    }
  }

  if (onFocusOutAllCapture) {
    for (const input of inputs) {
      const handler = (e: FocusEvent) => {
        if (includes(inputs, e.relatedTarget)) return;
        onFocusOutAllCapture(e);
      };
      input.addEventListener('focusout', handler, CAPTURE);
      callbacks.push(() => input.removeEventListener('focusout', handler, CAPTURE));
    }
  }

  if (onChangeAny) {
    for (const input of inputs) {
      const handler = onChangeAny;
      input.addEventListener('change', handler, BUBBLE);
      callbacks.push(() => input.removeEventListener('change', handler, BUBBLE));
    }
  }

  if (onChangeAnyCapture) {
    for (const input of inputs) {
      const handler = onChangeAnyCapture;
      input.addEventListener('change', handler, CAPTURE);
      callbacks.push(() => input.removeEventListener('change', handler, CAPTURE));
    }
  }

  if (onInputAny) {
    for (const input of inputs) {
      const handler = onInputAny;
      input.addEventListener('input', handler, BUBBLE);
      callbacks.push(() => input.removeEventListener('input', handler, BUBBLE));
    }
  }

  if (onInputAnyCapture) {
    for (const input of inputs) {
      const handler = onInputAnyCapture;
      input.addEventListener('input', handler, CAPTURE);
      callbacks.push(() => input.removeEventListener('input', handler, CAPTURE));
    }
  }

  return () => callbacks.forEach((fn) => fn());
};
