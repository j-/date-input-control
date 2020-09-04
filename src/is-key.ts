export const isKeyArrowLeft = (key: string): key is 'ArrowLeft' => (
  key === 'ArrowLeft'
);

export const isKeyArrowRight = (key: string): key is 'ArrowRight' => (
  key === 'ArrowRight'
);

export const isKeyBackspace = (key: string): key is 'Backspace' => (
  key === 'Backspace'
);

export const isKeyDelete = (key: string): key is 'Delete' => (
  key === 'Delete'
);

export const isKeyNumeric = (key: string): key is '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' => (
  key === '0' ||
  key === '1' ||
  key === '2' ||
  key === '3' ||
  key === '4' ||
  key === '5' ||
  key === '6' ||
  key === '7' ||
  key === '8' ||
  key === '9'
);

export const isKeySeparator = (key: string): key is '/' | '.' | ',' => (
  key === '/' ||
  key === '.' ||
  key === ','
);
