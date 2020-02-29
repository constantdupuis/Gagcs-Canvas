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
  /**
   *
   * @constructor
   * @param strategies - Set of strategies{@link Strategies} for Hyphea growing
   */
  constructor(strategies: Strategies) {}
  /**
   * Set growing Strategies for current Hyphea instance
   * @param strategies - Set Strategies to used to grow this instance of Hyphea, see each strategy interface for more info:
   */
  setStrategies(strategies: Strategies): void {}
  /**
   *
   */
  addRoot(x: number, y: number): void {}
  /**
   *
   * @param draw - Drawing strategy to apply on growing buds
   */
  growStep(draw: DrawingStrategy): void {}

  /**
   * Grow all Hyphea without drawing it, only generate Buds
   */
  growAll(): void {}

  /**
   *
   * @param draw - Drawing strategy to apply on all generated buds
   */
  drawAll(draw: DrawingStrategy): void {}
}
