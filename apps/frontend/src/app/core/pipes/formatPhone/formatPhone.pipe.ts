import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatPhone', standalone: true })
export class FormatPhonePipe implements PipeTransform {
  transform(value: string | number | null | undefined): string {
    if (value == null) return '';
    const digits = String(value).replace(/\D/g, '').slice(0, 13);
    if (!digits) return '';

    const hasDDI = digits.startsWith('55') && digits.length >= 12;
    const ddi = hasDDI ? '55' : '';
    const raw = hasDDI ? digits.slice(2) : digits;

    const ddd = raw.slice(0, 2);
    const rest = raw.slice(2);

    if (raw.length <= 2) return ddi ? `+${ddi} (${ddd}` : `(${ddd}`;
    if (rest.length <= 4) return ddi ? `+${ddi} (${ddd}) ${rest}` : `(${ddd}) ${rest}`;
    if (rest.length <= 8) return ddi ? `+${ddi} (${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}` : `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
    return ddi ? `+${ddi} (${ddd}) ${rest.slice(0, 5)}-${rest.slice(5, 9)}` : `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5, 9)}`;
  }
}
