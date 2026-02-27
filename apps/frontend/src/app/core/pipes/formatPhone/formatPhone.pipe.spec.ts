import { FormatPhonePipe } from './formatPhone.pipe';

describe('FormatPhonePipe', () => {
  it('create an instance', () => {
    const pipe = new FormatPhonePipe();
    expect(pipe).toBeTruthy();
  });
});
