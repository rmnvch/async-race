import { IDrawArgs, IRankingsArgsState, IWinners } from '../../types/index';
import Garage from './Garage/Garage';
import { createWinnerModal } from './Modal/modal';
import Rankings from './Rankings/Rankings';
import { createSwitchElement } from './Switch/Switch';

export default class AppView {
    garage;
    switch;
    rankings;
    container;
    constructor(parentNode: HTMLElement) {
        this.container = parentNode;
        this.switch = createSwitchElement();
        this.garage = new Garage();
        this.rankings = new Rankings();
    }

    drawSwitch() {
        this.container.prepend(this.switch);
    }

    drawGarage(data: IDrawArgs) {
        this.garage.draw(data || []);
    }

    drawRankings(data: IWinners, state: IRankingsArgsState) {
        this.rankings.draw(data, state);
    }

    drawWinnerModal(data: { name: string; time: number }) {
        const modal = createWinnerModal(data);
        this.container.append(modal);
    }
}
