import { focus, focusStart, focusEnd } from './focus';
import { isSelectionStart, isSelectionEnd, isSelectionEmpty } from './selection';
import {
  isKeyArrowLeft,
  isKeyArrowRight,
  isKeyBackspace,
  isKeyDelete,
  isKeyNumeric,
  isKeySeparator,
} from './is-key';

export const createDateInputControlPart = (elPrev: HTMLInputElement | null, elCurr: HTMLInputElement, elNext: HTMLInputElement | null) => {
  const onTextInput = (e: Event) => {
    const data = (e as InputEvent).data;
    if (data && data.search(/[^0-9]/) > -1) {
      e.preventDefault();
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const { key } = e;
    const currentTarget = e.currentTarget as HTMLInputElement;
    if (
      // If backspace key was pressed
      isKeyBackspace(key) &&
      // at the beginning of the field
      isSelectionStart(currentTarget) &&
      // and there is a field to the left
      elPrev
    ) {
      // Move focus to end of the previous field
      focusEnd(elPrev);
      return;
    }
    if (
      // If delete key was pressed
      isKeyDelete(key) &&
      // at the end of the field
      isSelectionEnd(currentTarget) &&
      // and there is a field to the right
      elNext
    ) {
      // Move focus to start of the next field
      focusStart(elNext);
      return;
    }
    if (
      // If left arrow was pressed
      isKeyArrowLeft(key) &&
      // when the cursor is at the beginning of the field
      isSelectionStart(currentTarget) &&
      // and there is a field to the left
      elPrev
    ) {
      // Prevent cursor moving
      e.preventDefault();
      // Move focus to end of the previous field
      focusEnd(elPrev);
      return;
    }
    if (
      // If right arrow key was pressed
      isKeyArrowRight(key) &&
      // when the cursor is at the end of the field
      isSelectionEnd(currentTarget) &&
      // and there is a field to the right
      elNext
    ) {
      // Prevent cursor moving
      e.preventDefault();
      // Move focus to start of the next field
      focusStart(elNext);
      return;
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    const { key } = e;
    const currentTarget = e.currentTarget as HTMLInputElement;
    if (
      // If number key was pressed
      isKeyNumeric(key) &&
      // when the cursor was at the end of the field
      isSelectionEnd(currentTarget) &&
      // and the field is full
      currentTarget.value.length >= currentTarget.maxLength &&
      // and the the next field is not full
      elNext && elNext.value.length < elNext.maxLength
    ) {
      // Move focus to start of the next field
      focusStart(elNext);
      return;
    }
  };

  const onKeyPress = (e: KeyboardEvent) => {
    const { key } = e;
    const currentTarget = e.currentTarget as HTMLInputElement;
    if (
      // If punctuation key was pressed
      isKeySeparator(key)
    ) {
      // Swallow key press
      e.preventDefault();
      if (
        // If pressed on a non-empty field
        currentTarget.value !== '' &&
        // and no text was highlighted
        isSelectionEmpty(currentTarget) &&
        // and there is a field to the right
        elNext
      ) {
        // Move focus to the next field
        focus(elNext);
      }
      return;
    }
    if (
      // If number key is pressed
      isKeyNumeric(key)
    ) {
      if (
        // when the cursor is at the end of the field
        isSelectionEnd(currentTarget) &&
        // and the field is full
        currentTarget.value.length >= currentTarget.maxLength &&
        // and the the next field is not full
        elNext && elNext.value.length < elNext.maxLength
      ) {
        // Move focus to start of the next field
        focusStart(elNext);
      }
      return;
    }
    // Ignore all other key presses
    e.preventDefault();
  };

  elCurr.addEventListener('keydown', onKeyDown);
  elCurr.addEventListener('keyup', onKeyUp);
  elCurr.addEventListener('keypress', onKeyPress);
  elCurr.addEventListener('textInput', onTextInput);
  return () => {
    elCurr.removeEventListener('keydown', onKeyDown);
    elCurr.removeEventListener('keyup', onKeyUp);
    elCurr.removeEventListener('keypress', onKeyPress);
    elCurr.removeEventListener('textInput', onTextInput);
  };
};
