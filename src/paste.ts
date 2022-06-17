import { isInputFull } from './input';
import { isKeyNumeric, isKeySeparator } from './is-key';
import { isSelectionEnd } from './selection';

export const createPasteHandler = (input: HTMLInputElement, inputs: HTMLInputElement[]) => {
  const handlePaste = (e: ClipboardEvent) => {
    // Ignore pasting data if there is text after the cursor.
    if (!isSelectionEnd(input)) return;
    // Only interested in plain text representation of paste data.
    const data = e.clipboardData?.getData('text/plain');
    // If no data then ignore this event.
    if (!data) return;
    // If there IS data then prevent the default paste event.
    e.preventDefault();
    // Start with the input that was pasted into.
    let currentInputIndex = 0;
    let currentInput = inputs[currentInputIndex];
    // Iterate the characters of the paste event data.
    for (let i = 0; i < data.length; i++) {
      const char = data[i];
      // If this character is numeric then insert it as usual.
      if (isKeyNumeric(char)) {
        document.execCommand('insertText', false, char);
      }
      const nextChar = data[i + 1];
      // If the input is full and we are about to move focus but the next
      // character is going to be a separator anyway then we consume it.
      if (nextChar != null && isInputFull(currentInput) && isKeySeparator(nextChar)) {
        i++;
      }
      // Move focus whether because input was full or character was separator.
      if (isInputFull(currentInput) || isKeySeparator(char)) {
        // Continue along the chain.
        currentInputIndex++;
        currentInput = inputs[currentInputIndex];
        // Stop when out of inputs i.e. we have pasted into the last one.
        if (!currentInput) {
          break;
        }
        // Focus and highlight the contents of the next input.
        currentInput.focus();
        currentInput.select();
      }
    }
  };

  input.addEventListener('paste', handlePaste);
  return () => input.removeEventListener('paste', handlePaste);
};
