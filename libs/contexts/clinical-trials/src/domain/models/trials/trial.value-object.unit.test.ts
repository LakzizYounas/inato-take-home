import { describe, expect, test } from 'vitest';

import { TrialBuilder } from './trial.builder';

describe('Trial', () => {
  const twoDaysAgo = '2030-06-18';
  const oneDayAgo = '2030-06-19';
  const today = '2030-06-20';
  const inOneDay = '2030-06-21';
  const inTwoDays = '2030-06-22';

  test('Trial ongoing', () => {
    const ongoingTrial = new TrialBuilder().starts(oneDayAgo).ends(inOneDay).build();

    expect(ongoingTrial.isOngoing(new Date(today))).toBe(true);
  });

  test('Canceled trial is not ongoing', () => {
    const canceledTrial = new TrialBuilder()
      .starts(oneDayAgo)
      .ends(inOneDay)
      .canceled()
      .build();

    expect(canceledTrial.isOngoing(new Date(today))).toBe(false);
  });

  test('Ended trial is not ongoing', () => {
    const endedTrial = new TrialBuilder()
      .starts(twoDaysAgo)
      .ends(oneDayAgo)
      .canceled()
      .build();

    expect(endedTrial.isOngoing(new Date(today))).toBe(false);
  });

  test('Not started trial is not ongoing', () => {
    const notStartedTrial = new TrialBuilder()
      .starts(inOneDay)
      .ends(inTwoDays)
      .canceled()
      .build();

    expect(notStartedTrial.isOngoing(new Date(today))).toBe(false);
  });
});
