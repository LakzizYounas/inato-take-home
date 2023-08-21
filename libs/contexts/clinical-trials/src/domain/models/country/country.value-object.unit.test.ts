import { describe, expect, test } from 'vitest';

import { Country } from './country.value-object';

describe('Country', () => {
  test('Country must contains proper code and name', () => {
    expect(Country.fromCode('IT')).toEqual({ code: 'IT', name: 'Italy' });
  });

  test('Country code must match case insensitively', () => {
    const upperCase = Country.fromCode('FR');
    const lowerCase = Country.fromCode('fr');
    expect(upperCase.is(lowerCase)).toBe(true);
  });

  test.todo('Country must be initialized by a proper code');
});
