import { NgxNestedValuePipe } from './nested-value.pipe';

describe(`${NgxNestedValuePipe.name}`, () => {
  describe('transform', () => {
    it('create an instance', () => {
      const pipe = new NgxNestedValuePipe();
      expect(pipe).toBeTruthy();
    });

    describe('when value parameter is null', () => {
      it('should return null when name parameter not null', () => {
        const pipe = new NgxNestedValuePipe();

        expect(pipe.transform(null, 'test.test')).toBeNull();
        expect(pipe.transform(null, 'initial label')).toBeNull();
      });

      it('should return null when name parameter is null', () => {
        const pipe = new NgxNestedValuePipe();

        expect(pipe.transform(null, null)).toBeNull();
      });
    });

    describe('when value parameter is an object', () => {
      it('should return undefined when name parameter points to an undefined path', () => {
        const pipe = new NgxNestedValuePipe();
        const value = {
          first: {}
        };

        expect(pipe.transform(value, 'first.second')).toBeUndefined();
        expect(pipe.transform(value, 'second')).toBeUndefined();
        expect(pipe.transform(value, 'second.first')).toBeUndefined();
      });

      it('should return a value when name parameter points to a defined path', () => {
        const pipe = new NgxNestedValuePipe();
        const value = {
          first: {
            value: 'value',
            second: {
              value: 'value'
            }
          }
        };

        expect(pipe.transform(value, 'first')).toBe(value.first);
        expect(pipe.transform(value, 'first.value')).toBe(value.first.value);
        expect(pipe.transform(value, 'first.second')).toBe(value.first.second);
        expect(pipe.transform(value, 'first.second.value')).toBe(
          value.first.second.value
        );
      });
    });

    describe('when value parameter is not an object', () => {
      it('should return the value when name parameter is null or empty', () => {
        const pipe = new NgxNestedValuePipe();
        const arrayValue = [];
        const stringValue = 'string';

        expect(pipe.transform(arrayValue, null)).toBe(arrayValue);
        expect(pipe.transform(arrayValue, '')).toBe(arrayValue);
        expect(pipe.transform(stringValue, null)).toBe(stringValue);
        expect(pipe.transform(stringValue, '')).toBe(stringValue);
      });

      it('should return the value when name parameter is not null or empty', () => {
        const pipe = new NgxNestedValuePipe();
        const arrayValue = [];
        const stringValue = 'string';

        expect(pipe.transform(arrayValue, 'first')).toBe(arrayValue);
        expect(pipe.transform(arrayValue, 'first.second')).toBe(arrayValue);
        expect(pipe.transform(stringValue, 'first')).toBe(stringValue);
        expect(pipe.transform(stringValue, 'first.second')).toBe(stringValue);
      });
    });
  });
});
