import { Trial } from "./trial.value-object";

export type TrialMapper<MappedTrial> = (trial: Trial) => MappedTrial;
