import { Country } from '../../../../domain/models/country/country.value-object';
import { Sponsor } from '../../../../domain/models/sponsors/sponsor.value-object';
import { TrialMapper } from '../../../../domain/models/trials/trial-mapper.type';

type Filter = {
  sponsor?: string;
  countryCode?: string;
};

export class GetOngoingTrialsQuery<MappedTrial> {
  public readonly sponsor: Sponsor | undefined;
  public readonly country: Country | undefined;

  constructor({ sponsor, countryCode }: Filter, readonly mapper: TrialMapper<MappedTrial>) {
    this.sponsor = sponsor ? Sponsor.from(sponsor) : undefined;
    this.country = countryCode ? Country.fromCode(countryCode) : undefined;
  }
}
