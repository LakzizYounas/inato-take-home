import { beforeEach, describe, expect, test } from 'vitest';

import { TrialCollection } from '../../../../domain/models/trials/trial-collection.value-object';
import { TrialMapper } from '../../../../domain/models/trials/trial-mapper.type';
import { TrialBuilder } from '../../../../domain/models/trials/trial.builder';
import { Trial } from '../../../../domain/models/trials/trial.value-object';
import { DateProviderInMemory } from '../../infrastructure/gateway/date-provider/in-memory.gateway';
import { GetOngoingTrialsInMemoryGateway } from '../../infrastructure/gateway/get-ongoing-trial-gateway/in-memory.gateway';
import { GetOngoingTrialsHandler } from './get-ongoing-trials.handler';
import { GetOngoingTrialsQuery } from './get-ongoing-trials.query';

describe('Get Ongoing Trials', () => {
  let gateway: GetOngoingTrialsInMemoryGateway;
  let dateProvider: DateProviderInMemory;

  beforeEach(() => {
    gateway = new GetOngoingTrialsInMemoryGateway();
    dateProvider = new DateProviderInMemory();
  });

  test('Every ongoing trials', async () => {
    gateway.setNextOngoingTrials(
      TrialCollection.from([
        new TrialBuilder()
          .withSponsor('Sanofi')
          .withStartDate('2018-06-13')
          .withEndDate('2023-07-17')
          .build(),
        new TrialBuilder()
          .withSponsor('AstraZeneca')
          .withStartDate('2022-06-15')
          .withEndDate('2030-12-24')
          .build(),
      ]),
    );
    dateProvider.setDateOfNow(new Date('2024-07-17'));

    const ongoingTrials = await getOngoingTrialsMapped(sponsorTrialMapper);

    expect(ongoingTrials).toEqual([{ sponsor: 'AstraZeneca' }]);
  });

  test.todo('Sponsor ongoing trials');
  test.todo('Country ongoing trials');
  test.todo('Sponsor & country ongoing trials');
  test.todo('errors handling');

  async function getOngoingTrialsMapped(mapper: TrialMapper<unknown>) {
    const query = new GetOngoingTrialsQuery(mapper);
    const handler = new GetOngoingTrialsHandler(gateway, dateProvider);
    const ongoingTrials = await handler.execute(query);
    return ongoingTrials;
  }
});

function sponsorTrialMapper(trial: Trial) {
  return { sponsor: trial.sponsor };
}
