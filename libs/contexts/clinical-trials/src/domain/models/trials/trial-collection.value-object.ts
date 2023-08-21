import { List } from 'immutable';

import { Country } from '../country/country.value-object';
import { Sponsor } from '../sponsors/sponsor.value-object';
import { TrialMapper } from './trial-mapper.type';
import { Trial } from './trial.value-object';

export class TrialCollection {
  private constructor(private readonly trials: List<Trial>) {}

  public static from(trials: Trial[]) {
    return new TrialCollection(List(trials));
  }

  public ongoing(now: Date) {
    const ongoingList = this.trials.filter((trial) => trial.isOngoing(now));
    return new TrialCollection(ongoingList);
  }

  public fromSponsor(sponsor: Sponsor | undefined) {
    if (sponsor === undefined) return this;

    const sponsorsList = this.trials.filter((trial) => trial.sponsor.is(sponsor));
    return new TrialCollection(sponsorsList);
  }

  public fromCountry(country: Country | undefined) {
    if (country === undefined) return this;

    const countrysList = this.trials.filter((trial) => trial.country.is(country));
    return new TrialCollection(countrysList);
  }

  public map<MappedTrial>(mapper: TrialMapper<MappedTrial>): MappedTrial[] {
    return this.trials.map(mapper).toArray();
  }
}
