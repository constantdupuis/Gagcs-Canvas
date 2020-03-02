class DefaultGrowingStrategy implements GrowingStrategy {
  growStep: number = 2.0; // distance between two buds

  grow(branch: Branch, newBuds: Bud[]): boolean {
    let ret: boolean = false;
    // grow sub branches
    branch.childBranches.forEach(subBranch => {
      if (this.grow(subBranch, newBuds)) {
        ret = true;
      }
    });
    // grow this branche
    if (branch.currentLife < branch.timeToLive) {
      // set new bud position from last bud position and growth direction
      let lastBud = branch.lastBud;
      let newDir = p5.Vector.fromAngle(lastBud.dir, this.growStep);
      let newBud = new Bud(
        newDir.x,
        newDir.y,
        lastBud.dir,
        lastBud.radius,
        branch
      );
      branch.grow(newBud);
      newBuds.push(newBud);
      branch.currentLife++;
      ret = true;
    }

    return ret;
  }
}
