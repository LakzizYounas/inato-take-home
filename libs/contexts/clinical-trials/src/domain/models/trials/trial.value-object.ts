import { Country } from '../country/country.value-object';
import { Sponsor } from '../sponsors/sponsor.value-object';

export class Trial {
  private constructor(
    readonly name: string,
    readonly country: Country,
    readonly startDate: string,
    readonly endDate: string,
    readonly sponsor: Sponsor,
    readonly canceled: boolean,
    readonly studyType: string,
    readonly primaryPurpose: string,
  ) {}

  static from(props: TrialProps) {
    return new Trial(
      props.name,
      Country.fromCode(props.country),
      props.start_date,
      props.end_date,
      Sponsor.from(props.sponsor),
      props.canceled,
      props.study_type,
      props.primary_purpose,
    );
  }

  isOngoing(now: Date) {
    return (
      this.canceled === false &&
      new Date(this.startDate) < now &&
      new Date(this.endDate) > now
    );
  }
}

type TrialProps = {
  name: string;
  country: string;
  start_date: string;
  end_date: string;
  sponsor: string;
  canceled: boolean;
  study_type: string;
  primary_purpose: string;
};
