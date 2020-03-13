
declare var interpolate: any;
let nb_sections = 0;
let margin = 0;
let lineHeight = 0;
let section_lenght = 0;

let yRandomVariance = 0;

let drawCount = 0;
let c: p5.Color;
let points: any[] = [];

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
  drawCount = 400;

  for (let i = 0; i < nb_sections + 1; i++) {
    let x1 = margin + (i * section_lenght);

    points.push([x1, lineHeight]);

    // noStroke();
    // fill("red");
    // circle(x1, lineHeight, 10);

  }



  console.log("<setup");
}

/**
 * draw
 */
function draw() {

  //background("white");
  blendMode(MULTIPLY);

  let c2 = color("#00FFFF");
  c2.setAlpha(5);

  for (let t = 0.0; t < 1.0; t += 0.001) {
    let x = interpolate(t, 2, points);
    //console.log(x);
    noStroke();
    fill(c2);
    circle(x[0], x[1], 2);
  }

  // todo move points
  points.forEach((p) => {
    p[0] += randomGaussian(0, 5.2);
    p[1] += randomGaussian(0, 5.2);
  })


  drawCount--;
  if (drawCount == 0) {
    noLoop();
    console.log("done");
  }
}
