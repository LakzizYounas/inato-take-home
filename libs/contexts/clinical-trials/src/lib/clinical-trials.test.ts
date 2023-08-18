import { contextsClinicalTrials } from './contexts-clinical-trials';
import { describe, test, expect } from 'vitest';

describe('Dummy', () => {
  test('test', () => {
    expect(contextsClinicalTrials()).toBe('contexts-clinical-trials');
  });
});
