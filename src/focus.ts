export const focus = (el: HTMLElement) => {
  el.focus();
};

export const focusStart = (el: HTMLInputElement) => {
  el.focus();
  el.selectionStart = 0;
  el.selectionEnd = 0;
};

export const focusEnd = (el: HTMLInputElement) => {
  el.focus();
  el.selectionStart = el.value.length;
  el.selectionEnd = el.value.length;
};
