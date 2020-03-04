/**
 * Hypha branch division stategy, say when and how a branch divide
 */
interface DivisionStrategy {
  divide(parentBranch: Branch): boolean;
}
