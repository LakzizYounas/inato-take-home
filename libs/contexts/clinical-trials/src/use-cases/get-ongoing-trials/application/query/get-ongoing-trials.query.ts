import { TrialMapper } from '../../../../domain/models/trials/trial-mapper.type';

export class GetOngoingTrialsQuery<MappedTrial> {
  constructor(readonly mapper: TrialMapper<MappedTrial>) {}
}
