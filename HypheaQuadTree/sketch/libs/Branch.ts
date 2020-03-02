/**
 *
 */
class Branch {
  parentBranch: Branch = null;
  rootBud: Bud = null;
  lastBud: Bud = null;
  buds: Bud[] = [];
  generation: number = 0;
  childBranches: Branch[] = [];

  timeToLive: number = 100;
  currentLife: number = 0;
  growing = true;

  constructor(ttl: number) {
    this.timeToLive = ttl;
    this.currentLife = 0;
  }

  grow(bud: Bud) {
    if (this.rootBud == null) {
      this.rootBud = bud;
    }
    if (this.lastBud == null) {
      this.lastBud = bud;
    }
    this.buds.push(bud);
  }
}
