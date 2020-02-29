/**
 * Particle object that can be used by QuadTree (impenments IPosisionable
 */
class Bud implements IPoint {
  x: number = 0.0;
  y: number = 0.0;
  branch: Branch = null;
  dir: number;
  radius: number = 3;

  constructor(x: number, y: number, dir: number, parent: Branch) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.branch = parent;
  }
}
