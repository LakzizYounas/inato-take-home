import {
  GetOngoingTrialsHandler,
  GetTrialsFileGateway,
  RealDateProvider,
  makeGetOngoingTrialsExpressRouter,
  nameSponsorDurationJsonTrialMapper,
} from '@inato/contexts/clinical-trials';

export const initOngoingTrialsRouter = () => {
  const filePath = './trials.json';
  const getTrialsGateway = new GetTrialsFileGateway(filePath);
  const dateProvider = new RealDateProvider();
  const handler = new GetOngoingTrialsHandler(getTrialsGateway, dateProvider);

  const { getOngoingTrialsRouter } = makeGetOngoingTrialsExpressRouter(
    handler,
    nameSponsorDurationJsonTrialMapper,
  );

  return getOngoingTrialsRouter;
};
