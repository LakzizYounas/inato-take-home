import { DateProvider } from '../gateway/date-provider.gateway';
import { GetTrialsGateway } from '../gateway/get-trials.gateway';
import { GetOngoingTrialsQuery } from './get-ongoing-trials.query';

export class GetOngoingTrialsHandler<MappedTrial> {
  public constructor(
    private readonly getTrialsGateway: GetTrialsGateway,
    private readonly dateProvider: DateProvider,
  ) {}

  async execute({
    sponsor,
    country,
    mapper,
  }: GetOngoingTrialsQuery<MappedTrial>): Promise<MappedTrial[]> {
    const trials = await this.getTrialsGateway.execute();
    const now = this.dateProvider.now();
    return trials.ongoing(now).fromSponsor(sponsor).fromCountry(country).map(mapper);
  }
}
