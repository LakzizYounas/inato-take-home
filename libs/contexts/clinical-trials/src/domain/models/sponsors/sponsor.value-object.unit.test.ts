import { describe, expect, test } from 'vitest';

import { Sponsor } from './sponsor.value-object';

describe('Sponsor', () => {
  test('Two same Sponsor must be equal case insensitively', () => {
    const camelCaseSponsor = Sponsor.from('Sanofi');
    const lowerCaseSponsor = Sponsor.from('sanofi');
    expect(camelCaseSponsor.is(lowerCaseSponsor)).toBe(true);
  });

  test('Two different Sponsor must not be equal', () => {
    const sanofi = Sponsor.from('Sanofi');
    const astrazeneca = Sponsor.from('AstraZeneca');
    expect(sanofi.is(astrazeneca)).toBe(false);
  });
});
