import { List } from 'immutable';

import { TrialMapper } from './trial-mapper.type';
import { Trial, TrialProps } from './trial.value-object';

export class TrialCollection {
  private constructor(private readonly trials: List<Trial>) {}

  public static from(trials: TrialProps[]) {
    return new TrialCollection(List(trials.map(Trial.from)));
  }

  public ongoing(now: Date) {
    const ongoingList = this.trials.filter(
      (trial) => new Date(trial.startDate) < now && new Date(trial.endDate) > now,
    );
    return new TrialCollection(ongoingList);
  }

  public map<MappedTrial>(mapper: TrialMapper<MappedTrial>): MappedTrial[] {
    return this.trials.map(mapper).toArray();
  }
}
