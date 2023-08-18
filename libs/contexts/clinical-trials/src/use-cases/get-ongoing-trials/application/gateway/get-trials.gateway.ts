import { TrialCollection } from "../../../../domain/models/trials/trial-collection.value-object";

export interface GetTrialsGateway {
  execute(): Promise<TrialCollection>;
}
