import { Sponsor } from '../../../../domain/models/sponsors/sponsor.value-object';
import { TrialMapper } from '../../../../domain/models/trials/trial-mapper.type';

type Filter = {
  sponsor: string | undefined;
};

export class GetOngoingTrialsQuery<MappedTrial> {
  public readonly sponsor: Sponsor | undefined;

  constructor({ sponsor }: Filter, readonly mapper: TrialMapper<MappedTrial>) {
    this.sponsor = sponsor ? Sponsor.from(sponsor) : undefined;
  }
}
