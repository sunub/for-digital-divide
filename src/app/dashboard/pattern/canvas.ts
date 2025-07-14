export class Canvas {
  canvas: HTMLCanvasElement;
  stageWidth: number;
  stageHeight: number;

  constructor(ref: React.RefObject<HTMLCanvasElement>) {
    this.canvas = ref.current!;
    this.stageWidth = 0;
    this.stageHeight = 0;

    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.stageWidth = this.canvas.clientWidth;
    this.stageHeight = this.canvas.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
  }
}
