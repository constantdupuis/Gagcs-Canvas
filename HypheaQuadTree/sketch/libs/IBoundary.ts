interface IBoundary extends IPoint {
  contains(p: IPoint): boolean;
  intersects(r: IBoundary): boolean;
}
