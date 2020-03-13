let nb_sections = 0;
let margin = 0;
let lineHeight = 0;
let section_lenght = 0;

let xRandomVariance = 0;
let yRandomVariance = 0;

let drawCount = 100;
let c: p5.Color;

/**
 * setup
 */
function setup() {
  console.log(">setup");

  createCanvas(windowWidth, windowHeight);
  background("white");

  nb_sections = 10;
  margin = 50;
  lineHeight = windowHeight * 0.45;
  section_lenght = (windowWidth - (2 * margin)) / nb_sections;

  xRandomVariance = 150;
  yRandomVariance = 150;
  drawCount = 500;

  let c = color("red");
  c.setAlpha(20);
  stroke(c);
  noFill();
  strokeWeight(1);

  // let c = color("white");
  // c.setAlpha(128);
  // stroke(c);
  // noFill();
  // strokeWeight(2);

  // beginShape();
  // for (let i = 0; i < nb_sections; i++) {

  //   let x1 = margin + (i * section_lenght);
  //   let x2 = margin + ((i + 1) * section_lenght);

  //   let randomWeight = i / nb_sections;
  //   let ctrlP1x = x1 + (randomGaussian(0, xRandomVariance)) * randomWeight;
  //   let ctrlP1y = lineHeight + (randomGaussian(0, xRandomVariance * randomWeight)) * randomWeight;
  //   let ctrlP2x = x2 + (randomGaussian(0, xRandomVariance)) * randomWeight;
  //   let ctrlP2y = lineHeight + (randomGaussian(0, xRandomVariance)) * randomWeight;

  //   curveVertex(x1, ctrlP1y);

  // }
  // endShape();



  console.log("<setup");
}

/**
 * draw
 */
function draw() {



  beginShape();
  for (let i = 0; i < nb_sections; i++) {

    let x1 = margin + (i * section_lenght);
    let x2 = margin + ((i + 1) * section_lenght);

    let randomWeight = i / nb_sections;
    let ctrlP1x = x1 + (randomGaussian(0, xRandomVariance)) * randomWeight;
    let ctrlP1y = lineHeight + (randomGaussian(0, xRandomVariance * randomWeight)) * randomWeight;
    let ctrlP2x = x2 + (randomGaussian(0, xRandomVariance)) * randomWeight;
    let ctrlP2y = lineHeight + (randomGaussian(0, xRandomVariance)) * randomWeight;

    curveVertex(ctrlP1x, ctrlP1y);

  }
  endShape();

  drawCount--;
  if (drawCount == 0) noLoop();
}
