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
      8
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
    let seed = this.strategies.birth.birth(x, y, direction);
    this.seeds.push(seed);
    this.qtree.insert(seed.rootBud);
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
      // check colission with other branches, disable branch with colission detected
      // check fences, disable branches leaving fences
      if (seed.isGrowing()) {
        this.strategies.division.divide(seed);
        if (this.strategies.growing.grow(seed, newBuds)) {
          ret = true;
        }
      }
    });

    // draw new buds and add them to quadtree
    newBuds.forEach((bud, idx) => {
      draw.draw(bud);
      this.qtree.insert(bud);
    });

    return ret;
  }

  private growStep(draw: DrawingStrategy, newBuds: Bud[]): boolean {
    // TODO review ciode :-(
    let ret = false;

    // grow Seeds (branches)
    this.seeds.forEach(seed => {
      // check colission with other branches, disable branch with colission detected
      // check fences, disable branches leaving fences
      if (this.strategies.growing.grow(seed, newBuds)) {
        ret = true;
      }
    });

    return ret;
  }

  /**
   * Grow all seeds without drawing it, only generate branches
   */
  growAll(): void {}

  /**
   *
   * @param draw - Drawing strategy to apply on all generated buds
   */
  forEachDraw(drawer: DrawingStrategy): void {}
}
