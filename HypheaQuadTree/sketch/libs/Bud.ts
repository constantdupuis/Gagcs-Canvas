/**
 * Particle object that can be used by QuadTree (impenments IPosisionable
 */
class Bud implements Point {
  x: number = 0.0;
  y: number = 0.0;
  branch: Branch = null;
  dir: number;
  radius: number = 3;

  constructor(
    x: number,
    y: number,
    dir: number,
    radius: number,
    parent: Branch
  ) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.radius = radius;
    this.branch = parent;
  }
}
