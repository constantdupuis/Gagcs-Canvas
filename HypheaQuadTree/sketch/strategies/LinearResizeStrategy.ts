class LinearResizeStrategy implements ResizeStrategy {
  minLimit: number;
  maxLimit: number;
  resizeAmount: number;
  constructor(resizeAmount: number, min: number, max: number) {
    this.resizeAmount = resizeAmount;
    this.maxLimit = max;
    this.minLimit = min;
  }

  resize(input: number): number {
    let newVal = input + this.resizeAmount;
    if (newVal < this.minLimit) {
      return this.minLimit;
    }
    if (newVal > this.maxLimit) {
      return this.maxLimit;
    }
    return newVal;
  }
}
