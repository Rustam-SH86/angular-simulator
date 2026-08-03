import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {
  transform(phone: string, format: string): string {
    const clearPhone = phone.replace(/\D/g, '');

    if (format == 'compact') {
      return '+' + clearPhone;
    }
    if (format === 'international') {
      return (
        '+' +
        clearPhone.slice(0, 2) +
        ' ' +
        clearPhone.slice(2, 5) +
        ' ' +
        clearPhone.slice(5, 8) +
        ' ' +
        clearPhone.slice(8, 10) +
        ' ' +
        clearPhone.slice(10, 12)
      );
    }
    if (format === 'national') {
      return (
        clearPhone.slice(2, 5) +
        ' ' +
        clearPhone.slice(5, 8) +
        ' ' +
        clearPhone.slice(8, 10) +
        ' ' +
        clearPhone.slice(10, 12)
      );
    }
    if (format === 'masked') {
      return (
        '+' +
        clearPhone.slice(0, 2) +
        ' ' +
        clearPhone.slice(2, 5) +
        ' *** ** ' +
        clearPhone.slice(10, 12)
      );
    }
    return clearPhone;
  }
}
