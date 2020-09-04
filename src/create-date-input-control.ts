import { clean } from './clean';
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

export const createDateInputControl = (elDD: HTMLInputElement, elMM: HTMLInputElement, elYYYY: HTMLInputElement) => {

  const onInput = (e: Event) => {
    const currentTarget = e.currentTarget as HTMLInputElement;
    // Strip field of non-numeric characters when changed
    currentTarget.value = clean(currentTarget.value);
  };

  /* Day */

  const onKeyDownDD = (e: KeyboardEvent) => {
    const { key } = e;
    const currentTarget = e.currentTarget as HTMLInputElement;
    if (
      // If delete key was pressed
      isKeyDelete(key) &&
      // at the end of the field
      isSelectionEnd(currentTarget)
    ) {
      // Move focus to start of month field
      focusStart(elMM);
      return;
    }
    if (
      // If right arrow key was pressed
      isKeyArrowRight(key) &&
      // when the cursor is at the end of the field
      isSelectionEnd(currentTarget)
    ) {
      // Prevent cursor moving
      e.preventDefault();
      // Move focus to start of month field
      focusStart(elMM);
      return;
    }
  };

  const onKeyUpDD = (e: KeyboardEvent) => {
    const { key } = e;
    const currentTarget = e.currentTarget as HTMLInputElement;
    if (
      // If number key was pressed
      isKeyNumeric(key) &&
      // when the cursor was at the end of the field
      isSelectionEnd(currentTarget) &&
      // and the field has two characters in it now
      currentTarget.value.length >= 2 &&
      // and the month field is not full
      elMM.value.length < 2
    ) {
      // Move focus to start of month field
      focusStart(elMM);
      return;
    }
  };

  const onKeyPressDD = (e: KeyboardEvent) => {
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
        isSelectionEmpty(currentTarget)
      ) {
        // Move focus to anywhere in month field
        focus(elMM);
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
        // and the field has two characters in it already
        currentTarget.value.length >= 2 &&
        // and the month field is not full
        elMM.value.length < 2
      ) {
        // Move focus to start of month field
        focusStart(elMM);
      }
      return;
    }
    // Ignore all other key presses
    e.preventDefault();
  };

  /* Month */

  const onKeyDownMM = (e: KeyboardEvent) => {
    const { key } = e;
    const currentTarget = e.currentTarget as HTMLInputElement;
    if (
      // If backspace key was pressed
      isKeyBackspace(key) &&
      // at the beginning of the field
      isSelectionStart(currentTarget)
    ) {
      // Move focus to end of day field
      focusEnd(elDD);
      return;
    }
    if (
      // If delete key was pressed
      isKeyDelete(key) &&
      // at the end of the field
      isSelectionEnd(currentTarget)
    ) {
      // Move focus to start of year field
      focusStart(elYYYY);
      return;
    }
    if (
      // If left arrow was pressed
      isKeyArrowLeft(key) &&
      // when the cursor is at the beginning of the field
      isSelectionStart(currentTarget)
    ) {
      // Prevent cursor moving
      e.preventDefault();
      // Move focus to end of day field
      focusEnd(elDD);
      return;
    }
    if (
      // If right arrow key was pressed
      isKeyArrowRight(key) &&
      // when the cursor is at the end of the field
      isSelectionEnd(currentTarget)
    ) {
      // Prevent cursor moving
      e.preventDefault();
      // Move focus to start of year field
      focusStart(elYYYY);
      return;
    }
  };

  const onKeyUpMM = (e: KeyboardEvent) => {
    const { key } = e;
    const currentTarget = e.currentTarget as HTMLInputElement;
    if (
      // If number key was pressed
      isKeyNumeric(key) &&
      // when the cursor was at the end of the field
      isSelectionEnd(currentTarget) &&
      // and the field has two characters in it now
      currentTarget.value.length >= 2 &&
      // and the year field is not full
      elYYYY.value.length < 4
    ) {
      // Move focus to start of year field
      focusStart(elYYYY);
      return;
    }
  };

  const onKeyPressMM = (e: KeyboardEvent) => {
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
        isSelectionEmpty(currentTarget)
      ) {
        // Move focus to year field
        focus(elYYYY);
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
        // and the field has two characters in it already
        currentTarget.value.length >= 2 &&
        // and the year field is not full
        elYYYY.value.length < 4
      ) {
        // Move focus to start of year field
        focusStart(elYYYY);
      }
      return;
    }
    // Ignore all other key presses
    e.preventDefault();
  };

  /* Year */

  const onKeyDownYYYY = (e: KeyboardEvent) => {
    const { key } = e;
    const currentTarget = e.currentTarget as HTMLInputElement;
    if (
      // If backspace key was pressed
      isKeyBackspace(key) &&
      // at the beginning of the field
      isSelectionStart(currentTarget)
    ) {
      // Move focus to end of month field
      focusEnd(elMM);
      return;
    }
    if (
      // If left arrow was pressed
      isKeyArrowLeft(key) &&
      // when the cursor is at the beginning of the field
      isSelectionStart(currentTarget)
    ) {
      // Prevent cursor moving
      e.preventDefault();
      // Move focus to end of month field
      focusEnd(elMM);
      return;
    }
  };

  const onKeyPressYYYY = (e: KeyboardEvent) => {
    const { key } = e;
    if (
      // If numeric key was pressed
      isKeyNumeric(key)
    ) {
      return;
    }
    // Ignore all other key presses
    e.preventDefault();
  };

  elDD.addEventListener('keydown', onKeyDownDD);
  elDD.addEventListener('keyup', onKeyUpDD);
  elDD.addEventListener('keypress', onKeyPressDD);
  elDD.addEventListener('input', onInput);
  elMM.addEventListener('keydown', onKeyDownMM);
  elMM.addEventListener('keyup', onKeyUpMM);
  elMM.addEventListener('keypress', onKeyPressMM);
  elMM.addEventListener('input', onInput);
  elYYYY.addEventListener('keydown', onKeyDownYYYY);
  elYYYY.addEventListener('keypress', onKeyPressYYYY);
  elYYYY.addEventListener('input', onInput);
  return () => {
    elDD.removeEventListener('keydown', onKeyDownDD);
    elDD.removeEventListener('keyup', onKeyUpDD);
    elDD.removeEventListener('keypress', onKeyPressDD);
    elDD.removeEventListener('input', onInput);
    elMM.removeEventListener('keydown', onKeyDownMM);
    elMM.removeEventListener('keyup', onKeyUpMM);
    elMM.removeEventListener('keypress', onKeyPressMM);
    elMM.removeEventListener('input', onInput);
    elYYYY.removeEventListener('keydown', onKeyDownYYYY);
    elYYYY.removeEventListener('keypress', onKeyPressYYYY);
    elYYYY.removeEventListener('input', onInput);
  };
};
