/**
 * HYPHEA
 * ======
 *
 * Kind of hyphea drawing based on this article https://inconvergent.net/generative/hyphae/.
 *
 * System class to draw growing branches from roots.
 *
 * Growing behavior of branches are based on strategies for different aspect of that
 * growing like; birth, growing, division, fencing, drawing.
 *
 * Hyphea will grow branches, with Buds, avoiding any collision between branches
 * using a QuadTree structure/algo.
 *
 * For more info about QuadTree see these videos:
 * - https://www.youtube.com/watch?v=OJxEcs0w_kE
 * - https://www.youtube.com/watch?v=QQx_NmCIuCY
 * - https://www.youtube.com/watch?v=z0YFFg_nBjw
 *
 * Quick Start
 * ===========
 *
 * Create and populate a Strategies class. See Strategies {@link Strategies} for more info.
 * Set these @see Strategies it to an Hyphea instance.
 * Add roots.
 *
 */
class Hyphea {
  qtree: QuadTree<Bud>;
  strategies: HypheaStrategies;
  seeds: Branch[] = [];

  /**
   *
   * @constructor
   * @param strategies - Set strategies for Hyphea growing
   */
  constructor(strategies: HypheaStrategies) {
    this.strategies = strategies;
    this.qtree = new QuadTree<Bud>(
      new BoundaryRectangle(0, 0, windowWidth, windowHeight),
      16
    );
  }

  /**
   * Seed a Hyphea branch
   * @param x X coordinate of seed
   * @param y Y coordinate of seed
   * @param direction branch initial direction
   */
  seed(x: number, y: number, direction: number): void {
    // create a branche with a first bud at seed pos
    let seed = this.strategies.birth.birth(x, y, -direction);
    this.seeds.push(seed);
    //this.qtree.insert(seed.rootBud);
    // TODO HOW to draw the new seed!?
  }
  /**
   *
   * @param draw - Drawing strategy to apply on growing buds
   */
  drawGrowStep(draw: DrawingStrategy): boolean {
    let ret = false;
    let newBuds: Bud[] = [];

    // grow Seeds (branches)
    this.seeds.forEach(seed => {
      ret = this.innerGrowStep(seed, newBuds);
    });

    // draw new buds and add them to quadtree
    newBuds.forEach((bud, idx) => {
      draw.draw(bud);
      this.qtree.insert(bud);
    });

    return ret;
  }
  /**
   * Grow all seeds without drawing it, only generate branches
   */
  growAll(): void {
    let newBuds: Bud[] = [];
    // grow Seeds (branches)
    this.seeds.forEach(seed => {
      this.innerGrowStep(seed, newBuds);
    });
  }
  /**
   *
   * @param branch
   * @param newBuds
   */
  private innerGrowStep(branch: Branch, newBuds: Bud[]): boolean {
    let ret = false;

    // grow the branch
    if (branch.isGrowing()) {
      // divide the branch
      this.strategies.division.divide(branch);

      // if it grow, check collision on last growth bud
      if (this.strategies.growing.grow(branch)) {
        newBuds.push(branch.lastBud);
        this.checkCollision(branch);
        this.qtree.insert(branch.lastBud);
        // TODO: check fences, stop growing branches that will leave fences
        ret = true;
      }
    }

    // grow sub branches
    branch.childBranches.forEach(br => {
      if (br.isGrowing()) {
        ret = this.innerGrowStep(br, newBuds);
      }
    });

    return ret;
  }
  /**
   *
   * @param branch
   */
  private checkCollision(branch: Branch): void {
    let newBud = branch.lastBud;

    // get buds around the new bud
    let near = this.qtree.query(
      new BoundaryRectangle(newBud.x - 20, newBud.y - 20, 40, 40)
    );

    //console.log(`Buds around ${near.length}`);

    // exclude some buds
    near = near.filter(p => {
      // exclude buds from the same branche
      if (p.branch === branch) {
        //console.log("Exclude point from this branche");
        return false;
      }

      //if (branch.buds.length >= 40) return true;

      // excludes buds from child branches
      for (let i = 0; i < branch.childBranches.length; i++) {
        let childBranch = branch.childBranches[i];
        if (p.branch === childBranch) {
          //console.log("Exclude point from child branche");
          return false;
        }
      }

      // excludes buds from direct parent branche
      if (branch.parentBranch != null) {
        if (p.branch === branch.parentBranch) {
          //console.log("Exclude point from parent branche");
          return false;
        }

        for (let j = 0; j < branch.parentBranch.childBranches.length; j++) {
          let br = branch.parentBranch.childBranches[j];
          if (p.branch === br) return false;
        }
      }

      return true;
    });

    //console.log(`Buds around filtered ${near.length}`);

    // check distance, if to close stop the branch growing
    for (let i = 0; i < near.length; i++) {
      let p = near[i];
      if (
        p5.Vector.dist(
          createVector(p.x, p.y),
          createVector(newBud.x, newBud.y)
        ) < 5.0
      ) {
        //console.log("Bud to close");
        branch.setGrowing(false);
        break;
      }
    }
  }
  /**
   *
   * @param draw - Drawing strategy to apply on all generated buds
   */
  forEachDraw(drawer: DrawingStrategy): void {}
}
