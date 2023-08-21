import { countryByCode } from './country-by-code';

export class Country {
  private constructor(private readonly code: string, private readonly name: string) {}

  public static fromCode(code: string) {
    const country = countryByCode[code.toUpperCase()];
    return new Country(country.code, country.name);
  }

  public is(other: Country) {
    return this.code === other.code;
  }
}
