import {AbstractControl, ValidatorFn} from '@angular/forms';

export const urlIsValid: ValidatorFn = (control: AbstractControl) => {
  const url = control.value;
  if (!url) {
    return null;
  }

  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

  const valid = !!pattern.test(url);
  return valid ? null : {urlInvalid: true};
};
