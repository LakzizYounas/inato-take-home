export class TrialBuilder {
  private name = "Triple Negative Breast Cancer";
  private country = "ES";
  private startDate = "2018-06-13";
  private endDate = "2023-07-17";
  private sponsor = "Sanofi";
  private canceled = true;
  private studyType = "interventional";
  private primaryPurpose = "treatment";

  public withName(name: string) {
    this.name = name;
    return this;
  }

  public withStartDate(startDate: string) {
    this.startDate = startDate;
    return this;
  }

  public withEndDate(endDate: string) {
    this.endDate = endDate;
    return this;
  }

  public withSponsor(sponsor: string) {
    this.sponsor = sponsor;
    return this;
  }

  public withCountry(country: string) {
    this.country = country;
    return this;
  }

  public build() {
    return {
      name: this.name,
      country: this.country,
      start_date: this.startDate,
      end_date: this.endDate,
      sponsor: this.sponsor,
      canceled: this.canceled,
      study_type: this.studyType,
      primary_purpose: this.primaryPurpose,
    };
  }
}
