class DefaultDrawStrategy implements DrawingStrategy {
  draw(bud: Bud): void {
    fill("red");
    noStroke();
    circle(bud.x, bud.y, bud.radius * 2.0);
  }
}
