let nb_sections = 0;
let margin = 0;
let lineHeight = 0;
let section_lenght = 0;

let xRandomVariance = 0;
let yRandomVariance = 0;

let drawCount = 100;

/**
 * setup
 */
function setup() {
  console.log(">setup");

  createCanvas(windowWidth, windowHeight);
  background("red");

  nb_sections = 10;
  margin = 50;
  lineHeight = windowHeight * 0.45;
  section_lenght = (windowWidth - (2 * margin)) / nb_sections;


  xRandomVariance = 50;
  yRandomVariance = 50;
  drawCount = 100;

  // for (let i = 0; i < nb_sections; i++) {
  //   let c = color("white");
  //   c.setAlpha(128);
  //   stroke(c);
  //   noFill();
  //   strokeWeight(2);
  //   let x1 = margin + (i * section_lenght);
  //   let x2 = margin + ((i + 1) * section_lenght);

  //   let randomWeight = (i + 1) / nb_sections;
  //   console.log(`randomWeight ${randomWeight}`);
  //   let ctrlP1x = x1 + (randomGaussian(0, xRandomVariance)) * randomWeight;
  //   let ctrlP1y = height + (randomGaussian(0, xRandomVariance)) * randomWeight;
  //   let ctrlP2x = x2 + (randomGaussian(0, xRandomVariance)) * randomWeight;
  //   let ctrlP2y = height + (randomGaussian(0, xRandomVariance)) * randomWeight;

  //   bezier(x1, lineHeight, ctrlP1x, ctrlP1y, ctrlP2x, ctrlP2y, x2, lineHeight);
  // }

  console.log("<setup");
}

/**
 * draw
 */
function draw() {

  for (let i = 0; i < nb_sections; i++) {
    let c = color("white");
    c.setAlpha(50);
    stroke(c);
    noFill();
    strokeWeight(2);
    let x1 = margin + (i * section_lenght);
    let x2 = margin + ((i + 1) * section_lenght);

    let randomWeight = (i) / nb_sections;
    let ctrlP1x = x1 + (randomGaussian(0, xRandomVariance)) * randomWeight;
    let ctrlP1y = lineHeight + (randomGaussian(0, xRandomVariance)) * randomWeight;
    let ctrlP2x = x2 + (randomGaussian(0, xRandomVariance)) * randomWeight;
    let ctrlP2y = lineHeight + (randomGaussian(0, xRandomVariance)) * randomWeight;

    bezier(x1, lineHeight, ctrlP1x, ctrlP1y, ctrlP2x, ctrlP2y, x2, lineHeight);
  }

  drawCount--;
  if (drawCount == 0) noLoop();
}
