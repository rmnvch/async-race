import { IDrawArgs } from '../../../types/index';
import { createPgn } from '../Pgn/Pgn';
import { createTitle } from '../Title/Title';
import { createFormElement } from './Form/Form';
import { createTrack } from './Track/Track';

export default class Garage {
    draw(data: IDrawArgs) {
        if (document.querySelector('.garage')) {
            document.querySelector('.garage')?.remove();
        }
        const container = document.getElementById('app') as HTMLElement;
        const wrapper = document.createElement('div');
        wrapper.classList.add('app__garage', 'garage');

        const form = createFormElement();

        const title = createTitle('Garage', data.page, data.qty);

        const garageList = document.createElement('ul');
        garageList.classList.add('garage__list');

        data.data.forEach((item) => {
            const track = createTrack(item);
            garageList.append(track);
        });

        wrapper.append(form, title, garageList);

        if (data.qty > 7) {
            const pgn = createPgn(Math.ceil(data.qty / 7), 'garage', data.page);
            wrapper.append(pgn);
        }

        container.insertBefore(wrapper, document.querySelector('.app__score'));
    }
}
