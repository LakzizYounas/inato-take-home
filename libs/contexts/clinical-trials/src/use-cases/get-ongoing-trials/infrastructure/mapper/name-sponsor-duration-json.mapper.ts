import { TrialMapper } from '../../../../domain/models/trials/trial-mapper.type';
import { Trial } from '../../../../domain/models/trials/trial.value-object';

export const nameSponsorDurationJsonTrialMapper: TrialMapper<MappedTrial> = (trial: Trial) => ({
  name: trial.name,
  sponsor: trial.sponsor.toString(),
  start_date: trial.startDate,
  end_date: trial.endDate,
});

type MappedTrial = {
  name: string;
  start_date: string;
  end_date: string;
  sponsor: string;
};
