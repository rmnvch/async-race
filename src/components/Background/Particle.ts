export default class Particle {
    x;

    y;

    size;

    speed;

    angle;

    spin;

    img;

    ctx;

    canvas;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, imgSrc: HTMLImageElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 80 + 10;
        this.speed = Math.random() * 2 + 0.5;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? -1 : 1;
        this.img = imgSrc;
        this.ctx = ctx;
        this.canvas = canvas;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate((this.angle * Math.PI) / (360 * this.spin));
        this.ctx.drawImage(this.img, 0 - this.size / 2, 0 - this.size / 2, this.size, this.size);
        this.ctx.restore();
    }

    update() {
        this.angle += 2;
        if (this.y > this.canvas.height) {
            this.y = 0 - this.size;
            this.x = Math.random() * this.canvas.width;
            this.size = Math.random() * 20 + 50;
            this.speed = Math.random() * 5 + 1;
        }
        this.y += this.speed;
    }
}
