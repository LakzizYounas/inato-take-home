import { GetOngoingTrialsQuery } from './get-ongoing-trials.query';

export interface GetOngoingTrials<MappedTrial> {
  execute({ sponsor, country, mapper }: GetOngoingTrialsQuery<MappedTrial>): Promise<MappedTrial[]>;
}
