let hyphea: Hyphea;
let strategies: HypheaStrategies;
let drawer: DefaultDrawStrategy;
/**
 *
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#2D142C");

  // default draw strategy
  drawer = new DefaultDrawStrategy();

  // Set Hyphea growing strategies elements
  strategies.birth = new DefaultBirthStrategy(5.0, 100);
  strategies.growing = new DefaultGrowingStrategy();

  hyphea = new Hyphea(strategies);
  hyphea.seed(windowWidth / 2.0, windowHeight / 2.0, 0.0);
}

/**
 *
 */
function draw() {
  hyphea.drawGrowStep(drawer);
}
