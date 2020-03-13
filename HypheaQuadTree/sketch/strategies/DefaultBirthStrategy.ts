class DefaultBirthStrategy implements BirthStrategy {
  birthRadius: number = 5.0; // initial branch radius
  branchTTL: number = 100; // initial branch time to live

  constructor(birthRadius: number, timeTolive: number) {
    this.birthRadius = birthRadius;
    this.branchTTL = timeTolive;
  }

  birth(x: number, y: number, direction: number): Branch {
    let br = new Branch(0, this.branchTTL); // by default a new branch is generation 0 and has no parent branch
    let bu = new Bud(x, y, direction, this.birthRadius);
    br.grow(bu);
    return br;
  }
}
