
/**
 * Global QuadTree object
 */
let qtree: QuadTree<Bud>;

let roots: Branch[] = [];

/**
 *
 */
function setup() {
  createCanvas(windowWidth, windowHeight);

  background("#2D142C");

  qtree = new QuadTree<Bud>(
    new BoundaryRectangle(0, 0, windowWidth, windowHeight),
    8
  );

  // simple stop growing test before collistion
  // roots[0] = new Branch(qtree, windowWidth/2.0, windowHeight/2.0, - PI/2.0, 100, 0.0, 0.0);
  // roots[1] = new Branch(qtree, windowWidth*0.45, windowHeight*0.45, 0.0, 100, 0.0, 0.0);  
  // roots[2] = new Branch(qtree, windowWidth*0.55, windowHeight*0.4, PI, 100, 0.0, 0.0);  

  // branching test
  roots[0] = new Branch(qtree, windowWidth/2.0, windowHeight/2.0, - PI/2.0, 100, 10, 0.5);
}

/**
 *
 */
function draw() {
  //background("#2D142C");
  roots.forEach(root =>{
    root.grow();
  });
}


function drawParticle( p : Bud){
  //console.log(`Draw particle ${p.x}x${p.y} ${p.radius}`);
  noStroke();
  fill('white');
  circle(p.x, p.y, p.radius * 2.0);
}