import { unlink, writeFile } from 'fs/promises';
import { describe, expect, test } from 'vitest';

import { TrialCollection } from '../../../../../../domain/models/trials/trial-collection.value-object';
import { Trial } from '../../../../../../domain/models/trials/trial.value-object';
import { GetTrialsFileGateway } from './file.gateway';

describe('Get Ongoing Trials File Gateway', () => {
  test('Gateway should construct a trial collection from a file', async () => {
    const sanofiTrial = generateFetchedTrial({ sponsor: 'Sanofi' });
    const rocheTrial = generateFetchedTrial({ sponsor: 'Roche' });
    const trialsJson = JSON.stringify([sanofiTrial, rocheTrial]);
    const filePath = './file-gateway-it-test-trials.json';
    await writeFile(filePath, trialsJson, 'utf8');

    const gateway = new GetTrialsFileGateway(filePath);
    const trialsCollection = await gateway.execute();

    expect(trialsCollection).toEqual(
      TrialCollection.from([Trial.from(sanofiTrial), Trial.from(rocheTrial)]),
    );
    await unlink(filePath);
  });
});

function generateFetchedTrial({ sponsor }: { sponsor: string }) {
  return {
    name: 'Olaparib + Sapacitabine in BRCA Mutant Breast Cancer',
    country: 'FR',
    start_date: '2019-01-01',
    end_date: '2025-08-01',
    sponsor,
    canceled: false,
    study_type: 'interventional',
    primary_purpose: 'treatment',
  };
}
