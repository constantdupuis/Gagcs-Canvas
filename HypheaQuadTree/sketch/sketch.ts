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
  strategies.birth = new DefaultBirthStrategy(5.0, 200);

  // set Growth strategy
  strategies.growing = new DefaultGrowingStrategy(
    2.0,
    0.04,
    new DampenedResizeStrategy(0.99, 2.0, 10.0)
  );
  strategies.division = new YDivisionStrategy();

  hyphea = new Hyphea(strategies);

  // seed
  hyphea.seed(windowWidth / 2.0, windowHeight / 2.0, PI);
  console.log("<setup");
}

/**
 *
 */
function draw() {
  hyphea.drawGrowStep(drawer);
}
