/**
 *
 */
class YDivisionStrategy implements DivisionStrategy {
  divide(parentBranch: Branch): boolean {
    if (parentBranch.currentLife > 0 && parentBranch.currentLife % 30 == 0) {
      let lastBud = parentBranch.lastBud;
      let newBranch = new Branch(parentBranch.timeToLive / 2.0);
      let rootBud = new Bud(
        lastBud.x,
        lastBud.y,
        lastBud.dir + HALF_PI,
        lastBud.radius
      );
      newBranch.grow(rootBud);
      parentBranch.addChildBranch(newBranch);

      newBranch = new Branch(parentBranch.timeToLive / 2.0);
      rootBud = new Bud(
        lastBud.x,
        lastBud.y,
        lastBud.dir - HALF_PI,
        lastBud.radius
      );
      newBranch.grow(rootBud);
      parentBranch.addChildBranch(newBranch);
    }
    return true;
  }
}
