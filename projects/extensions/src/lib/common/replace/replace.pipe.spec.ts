import { NgxReplacePipe } from './replace.pipe';

describe(`${NgxReplacePipe.name}`, () => {
  let uut: NgxReplacePipe;

  beforeEach(() => {
    uut = new NgxReplacePipe();
  });

  afterEach(() => {
    uut = null;
  });

  it('should be correctly resolved', () => {
    expect(uut).toBeTruthy();
  });

  describe('value argument', () => {
    it('should throw, when given a non-string value as 1st argument', () => {
      const evaluate: (value: any) => string = value =>
        uut.transform(value, 'pattern', 'replace');

      expect(() => evaluate({})).toThrow();
      expect(() => evaluate(1)).toThrow();
      expect(() => evaluate([])).toThrow();
    });

    it('should gracefully handle null as value argument', () => {
      const result = uut.transform(null, 'pattern');

      expect(result).toBeFalsy();
    });
  });

  describe('pattern argument', () => {
    it('should noop, when given an undefined/null pattern as 2nd argument', () => {
      const value = 'value';

      const undefinedResult = uut.transform(value, undefined, 'replace');
      const nullResult = uut.transform(value, null, 'replace');

      expect(undefinedResult).toBe(value);
      expect(nullResult).toBe(value);
    });

    it('should throw, when given a truthy non string or regexp pattern as 2nd argument', () => {
      const evaluate: (pattern: any) => string = pattern =>
        uut.transform('value', pattern, 'replace');

      expect(() => evaluate({})).toThrow();
      expect(() => evaluate(1)).toThrow();
      expect(() => evaluate([])).toThrow();
    });
  });

  describe('replace argument', () => {
    it('should throw, when given a truthy non-string value as 3rd argument', () => {
      const evaluate: (replace: any) => string = replace =>
        uut.transform('value', 'pattern', replace);

      expect(() => evaluate({})).toThrow();
      expect(() => evaluate(1)).toThrow();
      expect(() => evaluate([])).toThrow();
    });

    it('should replace with ``, when no 3rd argument is passed', () => {
      const pattern = '22';
      const stringPatternResult = uut.transform('1221', pattern);
      const regexPatternResult = uut.transform('1221', new RegExp(pattern));

      expect(stringPatternResult).toBe('11');
      expect(regexPatternResult).toBe('11');
    });
  });
});
