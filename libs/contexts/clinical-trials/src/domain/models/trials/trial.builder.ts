import { Trial } from './trial.value-object';

export class TrialBuilder {
  private name = 'Triple Negative Breast Cancer';
  private country = 'ES';
  private startDate = '2018-06-13';
  private endDate = '2023-07-17';
  private sponsor = 'Sanofi';
  private isCanceled = false;
  private studyType = 'interventional';
  private primaryPurpose = 'treatment';

  public named(name: string) {
    this.name = name;
    return this;
  }

  past(today: Date) {
    this.startDate = this.datePlusDays(today, -10);
    this.endDate = this.datePlusDays(today, -5);
    return this;
  }

  inProgress(today: Date) {
    this.startDate = this.datePlusDays(today, -10);
    this.endDate = this.datePlusDays(today, 10);
    return this;
  }

  notStarted(today: Date) {
    this.startDate = this.datePlusDays(today, 5);
    this.endDate = this.datePlusDays(today, 10);
    return this;
  }

  private datePlusDays(date: Date, days: number) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate.toISOString().split('T')[0];
  }

  public canceled() {
    this.isCanceled = true;
    return this;
  }

  public sponsoredBy(sponsor: string) {
    this.sponsor = sponsor;
    return this;
  }

  public fromCountry(country: string) {
    this.country = country;
    return this;
  }

  public build(): Trial {
    return Trial.from({
      name: this.name,
      country: this.country,
      start_date: this.startDate,
      end_date: this.endDate,
      sponsor: this.sponsor,
      canceled: this.isCanceled,
      study_type: this.studyType,
      primary_purpose: this.primaryPurpose,
    });
  }
}
