/**
 * Default growing strategy for Hyphea Branch
 */
class DefaultGrowingStrategy implements GrowingStrategy {
  growStep: number = 4.0; // distance between two buds
  directionRandomness: number = PI / 8.0;
  directionRandomnessWeight: number = 0.5;
  resizeStrategy: ResizeStrategy;

  /**
   *
   * @param growStep Distance between two Buds
   * @param directionRandomness Randomness direction in radian
   * @param directionRandomnessWeight Randomness direction weight
   * @param resizeStrategy Resize strategy
   */
  constructor(
    growStep: number,
    directionRandomness: number,
    directionRandomnessWeight: number,
    resizeStrategy: ResizeStrategy
  ) {
    this.growStep = growStep;
    this.directionRandomness = directionRandomness;
    this.directionRandomnessWeight = directionRandomnessWeight;
    this.resizeStrategy = resizeStrategy;
  }

  /**
   *
   * @param branch The Branch to grow
   * @param newBuds The list of new Buds (out)
   * @returns Return true is branch is still growing
   */
  grow(branch: Branch, newBuds: Bud[]): boolean {
    let ret: boolean = false;
    // grow sub branches
    branch.childBranches.forEach(subBranch => {
      if (this.grow(subBranch, newBuds)) {
        ret = true;
      }
    });

    if (branch.currentLife >= branch.timeToLive) {
      branch.growing = false;
      return;
    }

    // grow this branche
    if (branch.currentLife < branch.timeToLive) {
      // set new bud position from last bud position and growth direction
      let lastBud = branch.lastBud;

      //console.log(`Last Bud (${lastBud.x}x${lastBud.y})`);
      let newDir =
        lastBud.dir * (1.0 - this.directionRandomnessWeight) +
        randomGaussian(0.0, this.directionRandomness) *
          this.directionRandomnessWeight;

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

      branch.grow(newBud);

      // push it to the new Buds list
      newBuds.push(newBud);
      // increase the branche life
      branch.currentLife++;
      ret = true;
    }

    return ret;
  }
}
