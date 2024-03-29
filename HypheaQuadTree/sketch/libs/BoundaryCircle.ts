/**
 * Boundary circle class
 */
class BoundaryCircle implements Boundary {
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
  contains(p: Point): boolean {
    if (
      p5.Vector.dist(createVector(p.x, p.y), createVector(this.x, this.y)) <
      this.r
    ) {
      return true;
    }
    return false;
  }

  /**
   * Check if r intersects with this rectangle
   * @param r Rectangle to check intersection with
   */
  intersects(r: BoundaryRectangle): boolean {
    // if (
    //   r.x > this.x + this.w ||
    //   r.y > this.y + this.h ||
    //   r.x + r.w < this.x ||
    //   r.y + r.h < this.y
    // ) {
    //   return false;
    // }
    return true;
  }
}
