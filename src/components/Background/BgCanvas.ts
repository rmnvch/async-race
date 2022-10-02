export default class Canvas {
    canvas;

    context;

    constructor(container: HTMLElement) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        container.appendChild(this.canvas);
    }
}
