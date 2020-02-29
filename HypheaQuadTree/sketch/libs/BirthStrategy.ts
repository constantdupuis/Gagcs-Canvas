/**
 * @interface BirthStrategy
 * Bud birth strategy, used to setp first Bud of a Branch, the root Bud
 */
interface BirthStrategy {
  birth(parent: Branch): Bud;
}
