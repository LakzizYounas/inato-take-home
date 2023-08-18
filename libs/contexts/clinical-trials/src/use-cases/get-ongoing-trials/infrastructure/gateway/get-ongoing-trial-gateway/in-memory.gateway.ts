import { TrialCollection } from "../../../../../domain/models/trials/trial-collection.value-object";
import { GetTrialsGateway } from "../../../application/gateway/get-trials.gateway";

export class GetOngoingTrialsInMemoryGateway implements GetTrialsGateway {
  private nextTrialCollection!: TrialCollection;

  public setNextOngoingTrials(trialCollection: TrialCollection) {
    this.nextTrialCollection = trialCollection;
  }

  public execute(): Promise<TrialCollection> {
    return Promise.resolve(this.nextTrialCollection);
  }
}
