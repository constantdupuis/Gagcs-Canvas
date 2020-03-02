interface GrowingStrategy {
  grow(branch: Branch, newBuds: Bud[]): boolean;
}
