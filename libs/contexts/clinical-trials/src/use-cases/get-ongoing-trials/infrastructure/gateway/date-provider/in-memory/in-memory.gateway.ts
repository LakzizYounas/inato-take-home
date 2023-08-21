import { DateProvider } from '../../../../application/gateway/date-provider.gateway';

export class DateProviderInMemory implements DateProvider {
  private dateOfNow!: Date;

  setDateOfNow(dateOfNow: Date) {
    this.dateOfNow = dateOfNow;
  }

  now(): Date {
    return this.dateOfNow;
  }
}
