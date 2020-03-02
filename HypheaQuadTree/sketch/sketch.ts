let hyphea: Hyphea;
let strategies: HypheaStrategies;
/**
 *
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#2D142C");

  strategies.birth = new BasicBirth(5.0, 100);

  hyphea = new Hyphea(strategies);
  hyphea.seed(windowWidth / 2.0, windowHeight / 2.0, 0.0);
}

/**
 *
 */
function draw() {}
