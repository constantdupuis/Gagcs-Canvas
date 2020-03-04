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

  /**
   *
   * @param childBranch
   */
  addChildBranch(childBranch: Branch): void {
    childBranch.parentBranch = this;
    this.childBranches.push(childBranch);
  }
  /**
   *
   */
  isGrowing(): boolean {
    return this.growing;
  }
  /**
   *
   * @param bud
   */
  grow(bud: Bud) {
    bud.branch = this;
    if (this.rootBud == null) {
      this.rootBud = bud;
    }
    this.buds.push(bud);
    this.lastBud = bud;
  }
}
