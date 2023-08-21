import { DateProvider } from '../../../../application/gateway/date-provider.gateway';

export class RealDateProvider implements DateProvider {
  now(): Date {
    return new Date();
  }
}
