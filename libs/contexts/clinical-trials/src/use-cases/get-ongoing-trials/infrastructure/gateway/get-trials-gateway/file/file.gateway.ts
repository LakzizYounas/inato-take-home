import { readFile } from 'fs/promises';

import { TrialCollection } from '../../../../../../domain/models/trials/trial-collection.value-object';
import { Trial } from '../../../../../../domain/models/trials/trial.value-object';
import { GetTrialsGateway } from '../../../../application/gateway/get-trials.gateway';

export class GetTrialsFileGateway implements GetTrialsGateway {
  constructor(private readonly filePath: string) {}

  async execute(): Promise<TrialCollection> {
    const jsonTrials = await readFile(this.filePath, 'utf8');
    const trials = JSON.parse(jsonTrials) as FetchedTrials[];
    return TrialCollection.from(trials.map((trial) => Trial.from(trial)));
  }
}

type FetchedTrials = {
  name: string;
  country: string;
  start_date: string;
  end_date: string;
  sponsor: string;
  canceled: boolean;
  study_type: string;
  primary_purpose: string;
};
