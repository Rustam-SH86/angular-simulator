import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {
  transform(phone: string, format: string): string {
    const clearPhone = phone.replace(/\D/g, '');

    if (clearPhone.length < 12) {
      return phone;
    }

    const phoneNumber = clearPhone.slice(0, 12);
    const extensionNumber = clearPhone.slice(12);

    if (format === 'compact') {
      return '+' + phoneNumber + (extensionNumber ? ` ${extensionNumber}` : '');
    }

    if (format === 'international') {
      return (
        '+' +
        phoneNumber.slice(0, 2) +
        ' ' +
        phoneNumber.slice(2, 5) +
        ' ' +
        phoneNumber.slice(5, 8) +
        ' ' +
        phoneNumber.slice(8, 10) +
        ' ' +
        phoneNumber.slice(10, 12) +
        (extensionNumber ? ` ${extensionNumber}` : '')
      );
    }

    if (format === 'national') {
      return (
        phoneNumber.slice(2, 5) +
        ' ' +
        phoneNumber.slice(5, 8) +
        ' ' +
        phoneNumber.slice(8, 10) +
        ' ' +
        phoneNumber.slice(10, 12) +
        (extensionNumber ? ` ${extensionNumber}` : '')
      );
    }

    if (format === 'masked') {
      return (
        '+' +
        phoneNumber.slice(0, 2) +
        ' ' +
        phoneNumber.slice(2, 5) +
        ' *** ** ' +
        phoneNumber.slice(10, 12) +
        (extensionNumber ? ` ${extensionNumber}` : '')
      );
    }

    return phone;
  }
}
