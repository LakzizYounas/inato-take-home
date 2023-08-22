import { DateProvider } from '../gateway/date-provider.gateway';
import { GetTrialsGateway } from '../gateway/get-trials.gateway';
import { GetOngoingTrials } from './get-ongoing-trials.interface';
import { GetOngoingTrialsQuery } from './get-ongoing-trials.query';

export class GetOngoingTrialsHandler<MappedTrial> implements GetOngoingTrials<MappedTrial> {
  constructor(
    private readonly getTrialsGateway: GetTrialsGateway,
    private readonly dateProvider: DateProvider,
  ) {}

  async execute({ sponsor, country, mapper }: GetOngoingTrialsQuery<MappedTrial>) {
    const trials = await this.getTrialsGateway.execute();
    const now = this.dateProvider.now();
    return trials.ongoing(now).fromSponsor(sponsor).fromCountry(country).map(mapper);
  }
}
