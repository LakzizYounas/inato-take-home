import { TrialMapper } from '../../../../domain/models/trials/trial-mapper.type';
import { Trial } from '../../../../domain/models/trials/trial.value-object';

export const nameCountryStringTrialMapper: TrialMapper<MappedTrial> = (trial: Trial) =>
  `${trial.name}, ${trial.country.asName()}`;

type MappedTrial = string;
