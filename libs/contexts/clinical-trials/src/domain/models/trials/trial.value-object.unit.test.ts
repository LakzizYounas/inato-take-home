import { describe, expect, test } from 'vitest';

import { TrialBuilder } from './trial.builder';

describe('Trial', () => {
  const today = new Date('2030-06-20');

  test('Trial ongoing', () => {
    const ongoingTrial = new TrialBuilder().inProgress(today).build();
    expect(ongoingTrial.isOngoing(new Date(today))).toBe(true);
  });

  test('Canceled trial is not ongoing', () => {
    const canceledTrial = new TrialBuilder().inProgress(today).canceled().build();
    expect(canceledTrial.isOngoing(new Date(today))).toBe(false);
  });

  test('Ended trial is not ongoing', () => {
    const endedTrial = new TrialBuilder().past(today).canceled().build();
    expect(endedTrial.isOngoing(new Date(today))).toBe(false);
  });

  test('Not started trial is not ongoing', () => {
    const notStartedTrial = new TrialBuilder().notStarted(today).canceled().build();
    expect(notStartedTrial.isOngoing(new Date(today))).toBe(false);
  });
});
