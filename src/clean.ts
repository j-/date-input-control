export const clean = (dirty: string): string => (
  dirty.replace(/[^0-9]*/, '')
);
