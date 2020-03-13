let nb_sections = 0;
let margin = 0;
let lineHeight = 0;
let section_lenght = 0;

let xRandomVariance = 0;
let yRandomVariance = 0;

let drawCount = 100;
let c: p5.Color;
let anchors: p5.Vector[] = [];
let splineControllers: SplineControllers[] = [];

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

  xRandomVariance = 50;
  yRandomVariance = 30;
  drawCount = 500;

  for (let i = 0; i < nb_sections + 1; i++) {
    let x1 = margin + (i * section_lenght);
    let x2 = margin + ((i + 1) * section_lenght);

    let randomWeight = i / nb_sections;

    let ctrlP1x = x1 + 10 + (random(0, xRandomVariance)) * randomWeight;
    let ctrlP1y = lineHeight + (randomGaussian(0, xRandomVariance * randomWeight)) * randomWeight;
    let ctrlP2x = x2 - 10 - (random(0, xRandomVariance)) * randomWeight;
    let ctrlP2y = lineHeight + (randomGaussian(0, xRandomVariance)) * randomWeight;


    anchors.push(createVector(x1, lineHeight));
    if (i < nb_sections) splineControllers.push(new SplineControllers(createVector(ctrlP1x, ctrlP1y), createVector(ctrlP2x, ctrlP2y)));
  }

  console.log("<setup");
}

/**
 * draw
 */
function draw() {

  //background("white");

  // stroke("red");
  // fill("red");

  // for (let i = 0; i < anchors.length - 1; i++) {
  //   let anchorA = anchors[i];
  //   let anchorB = anchors[i + 1];

  //   strokeWeight(4);
  //   circle(anchorA.x, anchorA.y, 5);
  //   if (i == anchors.length - 2) circle(anchorB.x, anchorB.y, 5);

  //   strokeWeight(2);
  //   line(anchorA.x, anchorA.y, anchorB.x, anchorB.y);
  // }

  // let c = color("green");
  // c.setAlpha(50);
  // stroke(c);
  // fill(c);

  // for (let i = 0; i < anchors.length - 1; i++) {
  //   let ctrls = splineControllers[i];
  //   let randomWeight = i / (anchors.length - 1);

  //   strokeWeight(4);
  //   circle(ctrls.ctrl1.x + randomGaussian(0, 1.5) * randomWeight, ctrls.ctrl1.y + randomGaussian(0, 1.5) * randomWeight, 5);
  //   circle(ctrls.ctrl2.x + randomGaussian(0, 1.5) * randomWeight, ctrls.ctrl2.y + randomGaussian(0, 1.5) * randomWeight, 5);
  // }

  let c = color("green");
  c.setAlpha(1);
  stroke(c);
  noFill();

  for (let i = 0; i < anchors.length - 1; i++) {
    let ctrls = splineControllers[i];
    let anchorA = anchors[i];
    let anchorB = anchors[i + 1];
    let randomWeight = i / (anchors.length - 1);

    bezier(anchorA.x, anchorA.y,
      ctrls.ctrl1.x, ctrls.ctrl1.y,
      ctrls.ctrl2.x, ctrls.ctrl2.y,
      anchorB.x, anchorB.y);

    ctrls.ctrl1.x += randomGaussian(0, 5.5) * randomWeight;
    ctrls.ctrl1.y += randomGaussian(0, 5.5) * randomWeight;
    ctrls.ctrl2.x += randomGaussian(0, 5.5) * randomWeight;
    ctrls.ctrl2.y += randomGaussian(0, 5.5) * randomWeight;

    splineControllers[i] = ctrls;
  }

  drawCount--;
  if (drawCount == 0) noLoop();
}
