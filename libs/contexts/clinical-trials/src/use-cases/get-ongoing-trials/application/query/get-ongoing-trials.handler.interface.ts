import { GetOngoingTrialsQuery } from './get-ongoing-trials.query';

export interface IGetOngoingTrialsHandler<MappedTrial> {
  execute({
    sponsor,
    country,
    mapper,
  }: GetOngoingTrialsQuery<MappedTrial>): Promise<MappedTrial[]>;
}
