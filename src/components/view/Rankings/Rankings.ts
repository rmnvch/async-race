import { createTitle } from '../Title/Title';
import { IRankingsArgsState, IWinners, Order, Sort } from '../../../types/index';
import { createTableLine } from './TableLine/TableLine';
import { createPgn } from '../Pgn/Pgn';

export default class Rankings {
    draw(data: IWinners, state: IRankingsArgsState) {
        const container = document.getElementById('app');

        if (document.querySelector('.app__score')) {
            document.querySelector('.app__score')?.remove();
        }

        const wrapper = document.createElement('div');
        wrapper.classList.add('app__score');
        if (state.view === 'rankings') wrapper.classList.add('visible');

        const title = createTitle('Rankings', data.page, data.total);

        const table = document.createElement('table');
        table.classList.add('app__score-table');
        table.setAttribute('width', '800');
        table.setAttribute('cellspacing', '0');
        table.setAttribute('cellpadding', '5');
        table.setAttribute('align', 'center');

        const headerRow = document.createElement('tr');
        const thIndex = document.createElement('th');
        const thScooter = document.createElement('th');
        const thName = document.createElement('th');
        const btnWins = document.createElement('th');
        const btnTime = document.createElement('th');
        const arrowWins = document.createElement('span');
        const arrowTime = document.createElement('span');

        thIndex.textContent = '#';
        thName.textContent = 'Name';
        thScooter.textContent = 'Scooter';

        btnWins.setAttribute('role', 'button');
        btnWins.setAttribute('data-btn', 'sort-wins');
        btnWins.textContent = 'Wins';

        btnTime.setAttribute('role', 'button');
        btnTime.setAttribute('data-btn', 'sort-time');
        btnTime.textContent = 'Best time';

        state.sort === Sort.time ? btnTime.classList.add('active-sort') : btnWins.classList.add('active-sort');

        if (state.sort === Sort.time && state.order === Order.DESC) btnTime.classList.add('reverse-order');
        if (state.sort === Sort.wins && state.order === Order.DESC) btnWins.classList.add('reverse-order');

        btnTime.append(arrowTime);
        btnWins.append(arrowWins);
        headerRow.append(thIndex, thScooter, thName, btnWins, btnTime);
        table.append(headerRow);

        for (let i = 0; i < data.data.length; i += 1) {
            const row = createTableLine(data.data[i], i + 1);
            table.append(row);
        }

        wrapper.append(title, table);

        if (data.total > 7) {
            const pgn = createPgn(Math.ceil(data.total / 7), 'rankings', state.page);
            wrapper.append(pgn);
        }
        container?.append(wrapper);
    }
}
