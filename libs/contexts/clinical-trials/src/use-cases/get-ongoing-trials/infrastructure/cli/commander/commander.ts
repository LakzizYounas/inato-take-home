import { program } from 'commander';

import { TrialMapper } from '../../../../../domain/models/trials/trial-mapper.type';
import { IGetOngoingTrialsHandler } from '../../../application/query/get-ongoing-trials.handler.interface';
import { GetOngoingTrialsQuery } from '../../../application/query/get-ongoing-trials.query';
import { Logger } from '../../gateway/logger/logger.interface';

export function makeGetOngoingTrialsCommander(
  handler: IGetOngoingTrialsHandler<string>,
  mapper: TrialMapper<string>,
  logger: Logger,
  programArguments: string[],
) {
  return () =>
    program
      .name('inato-cli')
      .command('trials')
      .description('get the list of clinical trials')
      .requiredOption('-c, --country <type>', 'filter on the country code')
      .action(async function ({ country }: { country: string | undefined }) {
        const query = new GetOngoingTrialsQuery({ countryCode: country }, mapper);
        const trials = await handler.execute(query);
        trials.forEach((trial) => logger.log(trial));
      })
      .parseAsync(programArguments);
}
