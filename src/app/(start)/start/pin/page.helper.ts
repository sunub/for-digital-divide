class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  root: HTMLDivElement;
  stageWidth: number = 0;
  stageHeight: number = 0;
  pixel: number;

  constructor(ref: HTMLCanvasElement, root: HTMLDivElement) {
    this.root = root;
    this.canvas = ref as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.pixel = window.devicePixelRatio > 1 ? 2 : 1;
    this.resize();
  }

  resize() {
    this.stageWidth = this.root.clientWidth;
    this.stageHeight = this.root.clientHeight;

    this.canvas.width = this.stageWidth * this.pixel;
    this.canvas.height = this.stageHeight * this.pixel;

    this.ctx.scale(this.pixel, this.pixel);
  }
}

export default Canvas;
