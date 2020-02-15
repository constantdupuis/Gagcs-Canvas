/**
 * AlternateBranching strategy, it will branch every  life % x
 * Branche randomly either right or left only
 */
class AlternateBranching implements IBranchingStrategy {
  branchingFreq: number;
  branchingLifeFactor: number;

  constructor(branchingFreq: number, branchingLifeFactor: number) {
    this.branchingFreq = branchingFreq;
    this.branchingLifeFactor = branchingLifeFactor;
  }

  branching(parentBranch: Branch): void {
    if (
      parentBranch.currentLife >= this.branchingFreq &&
      parentBranch.currentLife % this.branchingFreq == 0
    ) {
      let dir = random(6) < 3.0 ? -1.0 : 1.0;
      dir *= (PI * 1) / 4;
      dir += randomGaussian(0.0, (PI * 1) / 10);
      let newBranche = new Branch(
        parentBranch.qtree,
        parentBranch.fences,
        parentBranch.lastParticle.x,
        parentBranch.lastParticle.y,
        parentBranch.lastParticle.dir + dir,
        parentBranch.timeToLive * this.branchingLifeFactor,
        this
      );

      parentBranch.childBranches.push(newBranche);
      newBranche.parentBranch = parentBranch;
    }
  }
}
