import { IDrawArgs, IRankingsArgsState, IWinners } from '../types/index';
import Controller from './Controller/Controller';
import AppView from './view/appView';

export default class App {
    view;
    controller;
    container;
    constructor() {
        this.container = document.getElementById('app') as HTMLElement;
        this.controller = new Controller(
            (data: IDrawArgs) => this.view.drawGarage(data),
            (data: IWinners, state: IRankingsArgsState) => this.view.drawRankings(data, state),
            (data: { name: string; time: number }) => this.view.drawWinnerModal(data)
        );
        this.view = new AppView(this.container);
    }

    start() {
        this.view.drawSwitch();
        this.controller.updateScooters((data: IDrawArgs) => this.view.drawGarage(data));
        this.controller.getWinners((data: IWinners, state: IRankingsArgsState) => this.view.drawRankings(data, state));
        alert(
            "Welcome to Pizza Race! To have the best perfomance with App it's strongly recommended to fire those suspicious guys (Tesla, BMW, Mercedes and Ford). They have awkward names and we do not trust them. In addition to that you do not need to bother yourself with making up names. 'Create' will make 100% new name from scratch. Enjoy :)"
        );
    }
}
