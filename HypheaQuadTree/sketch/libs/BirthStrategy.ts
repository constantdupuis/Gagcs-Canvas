/**
 * @interface BirthStrategy
 * Bud birth strategy, used to setp first Bud of a Branch, the root Bud
 */
interface BirthStrategy {
  birth(x: number, y: number, direction: number): Branch;
}
