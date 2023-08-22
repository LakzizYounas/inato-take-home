export class Sponsor {
  private constructor(private readonly name: string) {}

  static from(name: string) {
    return new Sponsor(name);
  }

  public is(other: Sponsor) {
    return other.name.toLowerCase() === this.name.toLowerCase();
  }

  public toString() {
    return this.name;
  }
}
