/**
 * Default growing strategy for Hyphea Branch
 */
class DefaultGrowingStrategy implements GrowingStrategy {
  growStep: number = 4.0; // distance between two buds

  directionRandomnessWeight: number = 0.5;
  resizeStrategy: ResizeStrategy;

  /**
   *
   * @param growStep Distance between two Buds
   * @param directionRandomnessWeight Randomness direction weight
   * @param resizeStrategy Resize strategy
   */
  constructor(
    growStep: number,
    directionRandomnessWeight: number,
    resizeStrategy: ResizeStrategy
  ) {
    this.growStep = growStep;
    this.directionRandomnessWeight = directionRandomnessWeight;
    this.resizeStrategy = resizeStrategy;
  }

  /**
   *
   * @param branch The Branch to grow
   * @param newBuds The list of new Buds (out)
   * @returns Return true is branch is still growing
   */
  grow(branch: Branch): boolean {
    let ret: boolean = false;

    // grow this branche
    if (branch.isGrowing()) {
      // set new bud position from last bud position and growth direction
      let lastBud = branch.lastBud;
      //console.log(`Original dir ${lastBud.dir}`);

      //console.log(`Last Bud (${lastBud.x}x${lastBud.y})`);
      let rg = randomGaussian(0.0, 0.4) * this.directionRandomnessWeight;
      //console.log(`RandomGaussian ${rg}`);

      let newDir = lastBud.dir + rg;

      //console.log(`New dir ${newDir}`);
      // calculate new radius
      let newRadius = this.resizeStrategy.resize(lastBud.radius);

      // create new direction vector
      let newPosVec = p5.Vector.fromAngle(newDir, this.growStep);

      // create a new Bud
      let newBud = new Bud(
        lastBud.x + newPosVec.x,
        lastBud.y + newPosVec.y,
        newDir,
        newRadius
      );

      // add new Bud to branch
      branch.grow(newBud);

      // increase the branche life, and check against time to live
      branch.currentLife++;
      if (branch.currentLife >= branch.timeToLive) {
        // console.log(
        //   `Branch end of life reached ${branch.currentLife}  >= ${branch.timeToLive}`
        // );
        branch.setGrowing(false);
      } else {
        ret = true;
      }
    }

    return ret;
  }
}
