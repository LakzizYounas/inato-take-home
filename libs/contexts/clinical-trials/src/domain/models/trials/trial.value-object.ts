export class Trial {
  private constructor(
    readonly name: string,
    readonly country: string,
    readonly startDate: string,
    readonly endDate: string,
    readonly sponsor: string,
    readonly canceled: boolean,
    readonly studyType: string,
    readonly primaryPurpose: string
  ) {}

  static from(props: TrialProps) {
    return new Trial(
      props.name,
      props.country,
      props.start_date,
      props.end_date,
      props.sponsor,
      props.canceled,
      props.study_type,
      props.primary_purpose
    );
  }
}

export type TrialProps = {
  name: string;
  country: string;
  start_date: string;
  end_date: string;
  sponsor: string;
  canceled: boolean;
  study_type: string;
  primary_purpose: string;
};
