/**
 * Check if Bud leave fences, if it do, Bud owning branche is
 * not allowed to grow again
 */
interface FencingStrategy {
  fence(bud: Bud): void;
}
