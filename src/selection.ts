export const isSelectionStart = (el: HTMLInputElement) => (
  el.selectionStart === 0 &&
  el.selectionEnd === 0
);

export const isSelectionEnd = (el: HTMLInputElement) => (
  el.selectionStart === el.value.length &&
  el.selectionEnd === el.value.length
);

export const isSelectionEmpty = (el: HTMLInputElement) => (
  el.selectionStart === el.selectionEnd
);
