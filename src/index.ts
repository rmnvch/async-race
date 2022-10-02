import './css/style.css';
import Background from './components/Background/Background';
import App from './components/App';

const background = new Background(document.body);
background.animate();

const app = new App();
app.start();
app.controller.listen();
