export class Sponsor {
  private readonly name: string;

  private constructor(name: string) {
    this.name = name;
  }

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
