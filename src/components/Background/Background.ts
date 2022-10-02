import Canvas from './BgCanvas';
import Particle from './Particle';
import pizzaSrc from '../../assets/img/pizza-slice_pepp.svg';

export default class Background {
    canvas;

    particlesArray: Array<Particle>;

    numberOfParticles;

    img;
    constructor(container: HTMLElement) {
        this.canvas = new Canvas(container);
        this.particlesArray = [];
        this.numberOfParticles = 200;
        this.init = this.init.bind(this, null);
        this.animate = this.animate.bind(this, null);
        this.img = new Image();
        this.img.src = pizzaSrc;
        this.init();
    }

    init() {
        for (let i = 0; i < this.numberOfParticles; i += 1) {
            this.particlesArray.push(
                new Particle(this.canvas.canvas, this.canvas.context as CanvasRenderingContext2D, this.img)
            );
        }
    }

    animate() {
        (this.canvas.context as CanvasRenderingContext2D).clearRect(
            0,
            0,
            this.canvas.canvas.width,
            this.canvas.canvas.height
        );
        for (let i = 0; i < this.particlesArray.length; i += 1) {
            this.particlesArray[i].draw();
            this.particlesArray[i].update();
        }
        requestAnimationFrame(this.animate);
    }
}
