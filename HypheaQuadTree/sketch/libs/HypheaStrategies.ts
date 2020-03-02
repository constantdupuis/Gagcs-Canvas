/**
 * Gathering of strategy to be used by Hyphea
 *
 *
 */
interface HypheaStrategies {
  birth: BirthStrategy;
  growing: GrowingStrategy;
  branching: DivisionStrategy;
  fencing: FencingStrategy;
}
