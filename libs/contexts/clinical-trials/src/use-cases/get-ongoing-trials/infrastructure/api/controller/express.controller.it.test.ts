import express, { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, test } from 'vitest';

import { Country } from '../../../../../domain/models/country/country.value-object';
import { Sponsor } from '../../../../../domain/models/sponsors/sponsor.value-object';
import { Trial } from '../../../../../domain/models/trials/trial.value-object';
import { IGetOngoingTrialsHandler } from '../../../application/query/get-ongoing-trials.handler.interface';
import { GetOngoingTrialsQuery } from '../../../application/query/get-ongoing-trials.query';
import { makeGetOngoingTrialsRouter } from './express.controller';

describe('Get Ongoing Trials Express Controller', () => {
  let app: Express;
  let handler: HandlerSpy<unknown>;
  const mappedResult = 'mapped.result';

  beforeEach(() => {
    app = express();
    handler = new HandlerSpy();
    const mapper = () => mappedResult;
    const { getOngoingTrialsRouter } = makeGetOngoingTrialsRouter(handler, mapper);
    app.use(getOngoingTrialsRouter);
  });

  test('Call handler with proper query', async () => {
    const sponsor = 'Sanofi';
    const country = 'FR';

    const res = await request(app)
      .get('/ongoing')
      .query({ country, sponsor })
      .expect(200);

    expect(
      handler.hasBeenCalledWith(Sponsor.from(sponsor), Country.fromCode(country)),
    ).toBe(true);
    expect(res.body).toEqual([mappedResult]);
  });
});

class HandlerSpy<MappedTrial> implements IGetOngoingTrialsHandler<MappedTrial> {
  private sponsor: Sponsor | undefined;
  private country: Country | undefined;

  public async execute({
    sponsor,
    country,
    mapper,
  }: GetOngoingTrialsQuery<MappedTrial>): Promise<MappedTrial[]> {
    this.sponsor = sponsor;
    this.country = country;
    return [{} as Trial].map(mapper);
  }

  public hasBeenCalledWith(sponsor: Sponsor, country: Country) {
    return this.sponsor?.is(sponsor) && this.country?.is(country);
  }
}
