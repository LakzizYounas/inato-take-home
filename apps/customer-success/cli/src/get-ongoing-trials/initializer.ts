import {
  ConsoleLogger,
  GetOngoingTrialsHandler,
  GetTrialsFileGateway,
  RealDateProvider,
  makeGetOngoingTrialsCommander,
  nameCountryStringTrialMapper,
} from '@inato/contexts/clinical-trials';

export const initOngoingTrialsCommand = () => {
  const filePath = './trials.json';
  const getTrialsGateways = new GetTrialsFileGateway(filePath);
  const dateProvider = new RealDateProvider();
  const handler = new GetOngoingTrialsHandler<string>(getTrialsGateways, dateProvider);

  return makeGetOngoingTrialsCommander(
    handler,
    nameCountryStringTrialMapper,
    new ConsoleLogger(),
    process.argv,
  );
};
