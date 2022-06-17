/**
 * Emulate {@link document.execCommand} behaviour in JSDOM.
 */
const mockExecCommand = jest.fn<
  ReturnType<typeof document.execCommand>,
  Parameters<typeof document.execCommand>
>((commandId, _showUI, value) => {
  if (commandId !== 'insertText') throw new Error('Only "insertText" command is supported');
  if (value === undefined) return false;
  const { activeElement } = document;
  if (activeElement instanceof HTMLInputElement) {
    activeElement.value = (
      activeElement.value.slice(0, activeElement.selectionStart || 0) +
      value +
      activeElement.value.slice(activeElement.selectionEnd || 0)
    );
  }
  return true;
});

beforeEach(() => {
  Object.defineProperty(document, 'execCommand', {
    writable: true,
    value: mockExecCommand,
  });
});
