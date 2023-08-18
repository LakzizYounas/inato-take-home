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
    const pastTrial = new TrialBuilder()
      .sponsoredBy('Sanofi')
      .starts('2018-06-13')
      .ends('2023-07-17')
      .build();
    const canceledTrial = new TrialBuilder()
      .sponsoredBy('Bayer')
      .starts('2018-06-13')
      .ends('2030-07-17')
      .canceled()
      .build();
    const ongoingTrial = new TrialBuilder()
      .sponsoredBy('AstraZeneca')
      .starts('2022-06-15')
      .ends('2030-12-24')
      .build();
    gateway.setNextTrials(TrialCollection.from([pastTrial, canceledTrial, ongoingTrial]));
    dateProvider.setDateOfNow(new Date('2024-07-17'));

    const filter = { sponsor: undefined };
    const ongoingTrials = await getOngoingTrialsMapped(filter, sponsorTrialMapper);

    expect(ongoingTrials).toEqual([{ sponsor: ongoingTrial.sponsor.toString() }]);
  });

  test('Sponsor ongoing trials', async () => {
    const sanofiTrial = new TrialBuilder()
      .sponsoredBy('Sanofi')
      .starts('2018-06-13')
      .ends('2030-07-17')
      .build();
    const astraZenecaTrial = new TrialBuilder()
      .sponsoredBy('AstraZeneca')
      .starts('2022-06-15')
      .ends('2030-12-24')
      .build();
    gateway.setNextTrials(TrialCollection.from([sanofiTrial, astraZenecaTrial]));
    dateProvider.setDateOfNow(new Date('2024-07-17'));

    const filter = { sponsor: 'astraZeneca' };
    const ongoingTrials = await getOngoingTrialsMapped(filter, sponsorTrialMapper);

    expect(ongoingTrials).toEqual([{ sponsor: astraZenecaTrial.sponsor.toString() }]);
  });

  test.todo('Country ongoing trials');
  test.todo('Sponsor & country ongoing trials');
  test.todo('errors handling');

  async function getOngoingTrialsMapped(
    filter: { sponsor: string | undefined },
    mapper: TrialMapper<unknown>,
  ) {
    const query = new GetOngoingTrialsQuery(filter, mapper);
    const handler = new GetOngoingTrialsHandler(gateway, dateProvider);
    const ongoingTrials = await handler.execute(query);
    return ongoingTrials;
  }
});

function sponsorTrialMapper(trial: Trial) {
  return { sponsor: trial.sponsor.toString() };
}
