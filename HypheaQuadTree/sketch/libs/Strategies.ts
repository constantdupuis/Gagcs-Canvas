/**
 * Gathering of strategy to be used by Hyphea
 *
 *
 */
interface Strategies {
  birth: BirthStrategy;
  growing: GrowingStrategy;
  branching: DivisionStrategy;
  fencing: FencingStrategy;
}
