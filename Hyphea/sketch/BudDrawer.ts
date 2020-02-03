class BudDrawer{
  constructor()
  {}

  init()
  {}

  draw( b : Bud, c : chroma.Color)
  {
      fill(122, 126, 93);
      noStroke();
      circle(b.pos.x, b.pos.y, b.radius);
  }
}