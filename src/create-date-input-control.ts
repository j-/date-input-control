import { createDateInputControlPart } from './create-date-input-control-part';

export const createDateInputControl = (elDD: HTMLInputElement, elMM: HTMLInputElement, elYYYY: HTMLInputElement) => {
  const unsubscribeDD = createDateInputControlPart(null, elDD, elMM);
  const unsubscribeMM = createDateInputControlPart(elDD, elMM, elYYYY);
  const unsubscribeYYYY = createDateInputControlPart(elMM, elYYYY, null);
  return () => {
    unsubscribeDD();
    unsubscribeMM();
    unsubscribeYYYY();
  };
};
