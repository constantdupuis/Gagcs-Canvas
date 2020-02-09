class Branch {
  parentBranch: Branch = null;
  rootParticle: Particle = null;
  lastParticle: Particle = null;
}

/**
 * Particle object that can be used by QuadTree (impenments IPosisionable
 */
class Particle implements IPoint {
  x: number = 0.0;
  y: number = 0.0;
  branch: Branch = null;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

/**
 * Global QuadTree object
 */
let qtree: QuadTree<Particle>;

/**
 *
 */
function setup() {
  createCanvas(windowWidth, windowHeight);

  background("#2D142C");

  qtree = new QuadTree<Particle>(
    new BoundarySquare(0, 0, windowWidth, windowHeight),
    8
  );
}

/**
 *
 */
function draw() {
  background("#2D142C");
}
