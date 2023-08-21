import {
  GetOngoingTrialsHandler,
  GetTrialsFileGateway,
  RealDateProvider,
  makeGetOngoingTrialsRouter,
  nameSponsorDurationTrialMapper,
} from '@inato/contexts/clinical-trials';

export const initOngoingTrialsRouter = () => {
  const filePath = './trials.json';
  const handler = new GetOngoingTrialsHandler(
    new GetTrialsFileGateway(filePath),
    new RealDateProvider(),
  );
  const { getOngoingTrialsRouter } = makeGetOngoingTrialsRouter(
    handler,
    nameSponsorDurationTrialMapper,
  );
  return getOngoingTrialsRouter;
};
