import express, { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, test } from 'vitest';

import { Country } from '../../../../../domain/models/country/country.value-object';
import { Sponsor } from '../../../../../domain/models/sponsors/sponsor.value-object';
import { Trial } from '../../../../../domain/models/trials/trial.value-object';
import { GetOngoingTrials } from '../../../application/query/get-ongoing-trials.interface';
import { GetOngoingTrialsQuery } from '../../../application/query/get-ongoing-trials.query';
import { makeGetOngoingTrialsExpressRouter } from './express.controller';

describe('Get Ongoing Trials Express Controller', () => {
  let app: Express;
  let handler: HandlerSpy<unknown>;

  beforeEach(() => {
    app = express();
    handler = new HandlerSpy();
    const mapper = () => 'mapped.result';
    const { getOngoingTrialsRouter } = makeGetOngoingTrialsExpressRouter(handler, mapper);
    app.use(getOngoingTrialsRouter);
  });

  test('Initialize query and returns handler result', async () => {
    const sponsor = 'Sanofi';
    const country = 'FR';

    const res = await request(app)
      .get('/ongoing')
      .query({ country, sponsor })
      .expect(200);

    expect(
      handler.hasBeenCalledWith(Sponsor.from(sponsor), Country.fromCode(country)),
    ).toBe(true);
    expect(res.body).toEqual(handler.returnValue);
  });
});

class HandlerSpy<MappedTrial> implements GetOngoingTrials<MappedTrial> {
  private sponsor: Sponsor | undefined;
  private country: Country | undefined;
  public returnValue: MappedTrial[];

  public async execute({
    sponsor,
    country,
    mapper,
  }: GetOngoingTrialsQuery<MappedTrial>): Promise<MappedTrial[]> {
    this.sponsor = sponsor;
    this.country = country;
    this.returnValue = [{} as Trial].map(mapper);
    return this.returnValue;
  }

  public hasBeenCalledWith(sponsor: Sponsor, country: Country) {
    return this.sponsor?.is(sponsor) && this.country?.is(country);
  }
}
