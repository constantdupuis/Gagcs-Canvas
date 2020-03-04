/**
 * ResizeStrategy
 *
 * Will resize (grow or shrink) the input value with a min and max limit
 */
interface ResizeStrategy {
  minLimit: number;
  maxLimit: number;
  resize(input: number): number;
}
