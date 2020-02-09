/**
 * Boundary circle class
 */
class BoundaryCircle implements IBoundary {
  x: number;
  y: number;
  r: number;

  /**
   * Create new circle boundary
   * @param x topleft x coordinate of the circle
   * @param y topleft y coordinate of the circle
   * @param r radius of the circle
   */
  constructor(x: number, y: number, r: number) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  /**
   * Check if a point in inside the rectangle, borders included
   * @param p Point to check
   */
  contains(p: IPoint): boolean {
    if (
      p.x >= this.x &&
      p.x <= this.x + this.w &&
      p.y >= this.y &&
      p.y <= this.y + this.h
    ) {
      return true;
    }
    return false;
  }

  /**
   * Check if r intersects with this rectangle
   * @param r Rectangle to check intersection with
   */
  intersects(r: BoundarySquare): boolean {
    if (
      r.x > this.x + this.w ||
      r.y > this.y + this.h ||
      r.x + r.w < this.x ||
      r.y + r.h < this.y
    ) {
      return false;
    }
    return true;
  }
}
