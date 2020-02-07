interface IBoundary extends IPosisionable{

  contains(p: IPosisionable): boolean;
  intersects(r: IBoundary): boolean;
}
