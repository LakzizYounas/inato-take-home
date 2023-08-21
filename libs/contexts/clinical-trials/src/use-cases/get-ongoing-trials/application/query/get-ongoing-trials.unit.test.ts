import { beforeEach, describe, expect, test } from 'vitest';

import { TrialCollection } from '../../../../domain/models/trials/trial-collection.value-object';
import { TrialMapper } from '../../../../domain/models/trials/trial-mapper.type';
import { TrialBuilder } from '../../../../domain/models/trials/trial.builder';
import { Trial } from '../../../../domain/models/trials/trial.value-object';
import { DateProviderInMemory } from '../../infrastructure/gateway/date-provider/in-memory/in-memory.gateway';
import { GetTrialsInMemoryGateway } from '../../infrastructure/gateway/get-trials-gateway/in-memory/in-memory.gateway';
import { GetOngoingTrialsHandler } from './get-ongoing-trials.handler';
import { GetOngoingTrialsQuery } from './get-ongoing-trials.query';

describe('Get Ongoing Trials', () => {
  const today = new Date('2024-07-17');
  let gateway: GetTrialsInMemoryGateway;
  let dateProvider: DateProviderInMemory;

  beforeEach(() => {
    gateway = new GetTrialsInMemoryGateway();
    dateProvider = new DateProviderInMemory();
  });

  test('Every ongoing trials', async () => {
    const pastTrial = new TrialBuilder().sponsoredBy('Sanofi').past(today).build();
    const notStartedTrial = new TrialBuilder()
      .sponsoredBy('Roche')
      .notStarted(today)
      .build();
    const canceledTrial = new TrialBuilder()
      .sponsoredBy('Bayer')
      .inProgress(today)
      .canceled()
      .build();
    const ongoingTrial = new TrialBuilder()
      .sponsoredBy('AstraZeneca')
      .inProgress(today)
      .build();
    gateway.setNextTrials(
      TrialCollection.from([pastTrial, notStartedTrial, canceledTrial, ongoingTrial]),
    );
    dateProvider.setDateOfNow(today);

    const filter = {};
    const ongoingTrials = await getOngoingTrialsMapped(filter, sponsorTrialMapper);

    expect(ongoingTrials).toEqual([{ sponsor: ongoingTrial.sponsor.toString() }]);
  });

  test('Sponsor filtred ongoing trials', async () => {
    const sanofiTrial = new TrialBuilder()
      .sponsoredBy('Sanofi')
      .inProgress(today)
      .build();
    const astraZenecaTrial = new TrialBuilder()
      .sponsoredBy('AstraZeneca')
      .inProgress(today)
      .build();
    gateway.setNextTrials(TrialCollection.from([sanofiTrial, astraZenecaTrial]));
    dateProvider.setDateOfNow(new Date('2024-07-17'));

    const filter = { sponsor: 'astraZeneca' };
    const ongoingTrials = await getOngoingTrialsMapped(filter, sponsorTrialMapper);

    expect(ongoingTrials).toEqual([{ sponsor: astraZenecaTrial.sponsor.toString() }]);
  });

  test('Country ongoing trials', async () => {
    const frenchTrial = new TrialBuilder()
      .sponsoredBy('Sanofi')
      .fromCountry('FR')
      .inProgress(today)
      .build();
    const italianTrial = new TrialBuilder()
      .sponsoredBy('AstraZeneca')
      .fromCountry('IT')
      .inProgress(today)
      .build();
    gateway.setNextTrials(TrialCollection.from([frenchTrial, italianTrial]));
    dateProvider.setDateOfNow(new Date('2024-07-17'));

    const filter = { countryCode: 'IT' };
    const ongoingTrials = await getOngoingTrialsMapped(filter, sponsorTrialMapper);

    expect(ongoingTrials).toEqual([{ sponsor: italianTrial.sponsor.toString() }]);
  });

  test.todo('Sponsor & country ongoing trials');
  test.todo('errors handling');

  async function getOngoingTrialsMapped(
    filter: { sponsor?: string; countryCode?: string },
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
