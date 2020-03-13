interface Boundary extends Point {
  contains(p: Point): boolean;
  intersects(r: Boundary): boolean;
}
