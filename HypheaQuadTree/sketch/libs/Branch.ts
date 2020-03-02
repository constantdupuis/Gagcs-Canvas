/**
 *
 */
class Branch {
  parentBranch: Branch = null;
  rootParticle: Bud = null;
  lastParticle: Bud = null;
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
    if (this.rootParticle == null) {
      this.rootParticle = bud;
    }
    if (this.lastParticle == null) {
      this.lastParticle = bud;
    }
    this.buds.push(bud);
  }
}
