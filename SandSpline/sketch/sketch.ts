let nb_sections = 0;
let margin = 0;
let lineHeight = 0;
let section_lenght = 0;

let yRandomVariance = 0;

let drawCount = 0;
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

  nb_sections = 20;
  margin = 50;
  lineHeight = windowHeight * 0.45;
  section_lenght = (windowWidth - (2 * margin)) / (nb_sections);

  yRandomVariance = 5.2;
  drawCount = 500;

  for (let i = 0; i < nb_sections + 1; i++) {
    let x1 = margin + (i * section_lenght);
    let x2 = margin + ((i + 1) * section_lenght);

    anchors.push(createVector(x1, lineHeight));

  }

  console.log("<setup");
}

/**
 * draw
 */
function draw() {

  //background("white");

  let c2 = color("#005698");
  c2.setAlpha(5);

  beginShape();

  for (let i = 0; i < anchors.length; i++) {
    let anchorA = anchors[i];
    let randomWeight = i / anchors.length;

    // stroke(c);
    // noFill();
    // strokeWeight(4);
    // circle(anchorA.x, anchorA.y, 5);

    stroke(c2);
    noFill();
    strokeWeight(5);
    curveVertex(anchorA.x, anchorA.y);

    anchorA.x += randomGaussian(0, yRandomVariance) * randomWeight / 4.0;
    anchorA.y += randomGaussian(0, yRandomVariance) * randomWeight;

  }
  endShape();


  drawCount--;
  if (drawCount == 0) noLoop();
}
