let hyphea: Hyphea;
let strategies: HypheaStrategies;
let drawer: DefaultDrawStrategy;
/**
 *
 */
function setup() {
  console.log(">setup");
  createCanvas(windowWidth, windowHeight);
  background("#2D142C");

  randomSeed(sin(Date.now()) * Date.now() * 32153.13654);
  //randomSeed(1654.321654);

  // default draw strategy
  drawer = new DefaultDrawStrategy();

  // Set Hyphea growing strategies elements
  strategies = new HypheaStrategies();

  // set Birth strategy
  strategies.birth = new DefaultBirthStrategy(3.0, 400);

  // set Growth strategy
  strategies.growing = new DefaultGrowingStrategy(
    2.0,
    0.15,
    new DampenedResizeStrategy(0.99, 1.0, 100.0)
  );
  strategies.division = new YDivisionStrategy(20, 1.0);

  hyphea = new Hyphea(strategies);

  // seed
  hyphea.seed(windowWidth * 0.55, windowHeight * 0.45, (TWO_PI * 1.0) / 8.0);
  // hyphea.seed(windowWidth * 0.55, windowHeight * 0.55, (TWO_PI * 7.0) / 8.0);
  // hyphea.seed(windowWidth * 0.45, windowHeight * 0.45, (TWO_PI * 3.0) / 8.0);
  // hyphea.seed(windowWidth * 0.45, windowHeight * 0.55, (TWO_PI * 5.0) / 8.0);
  console.log("<setup");
}

/**
 *
 */
function draw() {
  hyphea.drawGrowStep(drawer);
}
