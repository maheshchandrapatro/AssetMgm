import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {

//     const checkControl: AbstractControl | null

//   static match(controlName: string, checkControlName: string): ValidatorFn {
//     return (controls: AbstractControl) => {
//       const control :any= controls.get(controlName);
//       const checkControl:any = controls.get(checkControlName);

//       if (checkControl.errors && !checkControl.errors.matching) {
//         return null;
//       }

//       if (control.value !== checkControl.value) {
//         controls.get(checkControlName).setErrors({ matching: true });
//         return { matching: true };
//       } else {
//         return null;
//       }
//     };
//   }
}
