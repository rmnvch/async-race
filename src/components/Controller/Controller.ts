import {
    ButtonType,
    ICar,
    IDrawArgs,
    IState,
    Order,
    Sort,
    TGarageCallback,
    TModalCallback,
    TRankingsCallback,
} from '../../types/index';
import Loader from '../module/module';
import { createName } from '../utils/createName';
import createRandomColor from '../utils/createRandomColor';
import { createRandomStopMessage } from '../utils/createRandomStopMessage';

export default class Controller extends Loader {
    state: IState;
    cb;
    cbW;
    cbM;
    constructor(cb: TGarageCallback, cbW: TRankingsCallback, cbM: TModalCallback) {
        super();
        this.cb = cb;
        this.cbW = cbW;
        this.cbM = cbM;
        this.state = {
            page: 1,
            winnersPage: 1,
            view: 'garage',
            idToUpd: 0,
            animated: {},
            idOnPage: [],
            speed: [],
            raceMode: false,
            sortType: Sort.time,
            sortOrder: Order.ASC,
        };
        this.listen = this.listen.bind(this);
    }

    async updateScooters(cb: TGarageCallback) {
        const data = await super.getScootersData(this.state.page);
        this.updateIdsOnPage(data);
        this.resetRace();
        cb(data);
    }

    private updateIdsOnPage(data: IDrawArgs) {
        const idList = data.data.reduce((acc: number[], curr: ICar) => {
            acc.push(curr['id']);
            return acc;
        }, []);
        this.setIdsOnPageState = idList;
    }

    set setIdsOnPageState(arr: number[]) {
        this.state.idOnPage = [...arr];
    }

    get getIdsOnPageState() {
        return this.state.idOnPage;
    }

    set setRaceMode(mode: boolean) {
        this.state.raceMode = mode;
    }

    get raceModeState() {
        return this.state.raceMode;
    }

    async getWinners(cb: TRankingsCallback) {
        const data = await super.getWinnersData(this.state.winnersPage, this.state.sortType, this.state.sortOrder);
        cb(data, {
            view: this.state.view,
            page: this.state.winnersPage,
            sort: this.state.sortType,
            order: this.state.sortOrder,
        });
    }

    protected getFormValue(btn: HTMLElement) {
        let name;
        let color;
        const form = btn.closest('form') as HTMLFormElement;
        const elements = Array.from(form.elements);
        const value = elements
            .filter((item) => item.tagName === 'INPUT')
            .map((item) => (item as HTMLInputElement).value);
        value[0].length ? (name = createName(value[0])) : (name = createName());
        value[1] === '#ffffff' ? (color = createRandomColor()) : (color = value[1]);
        form.reset();
        return { name, color };
    }

    protected addScooter(btn?: HTMLElement) {
        let name;
        let color;
        if (btn) {
            const value = this.getFormValue(btn);
            super.createScooter({ name: value.name, color: value.color });
            this.updateScooters(this.cb);
        } else {
            name = createName();
            color = createRandomColor();

            super.createScooter({ name, color });
        }
    }

    protected async updateScooterData(btn: HTMLElement) {
        const id = this.stateIdToUpd;
        const value = this.getFormValue(btn);
        super.updateScooter(id, value);
        this.updateScooters(this.cb);
    }

    protected async removeScooter(id: string) {
        await super.deleteScooter(id);
        this.updateScooters(this.cb);
        this.getWinners(this.cbW);
    }

    protected startRace() {
        this.setRaceMode = true;
        document
            .querySelector('.form')
            ?.querySelectorAll('[role]')
            .forEach((item: Node) => {
                const btn = item as HTMLButtonElement;
                if (btn.dataset['btn'] !== 'reset') btn.disabled = true;
            });
        const contestants: Array<number> = this.getIdsOnPageState;
        contestants.forEach((id) => {
            this.startScooter(id.toString());
        });
    }

    protected resetRace() {
        if (this.raceModeState) {
            const contestants: Array<number> = this.getIdsOnPageState;
            contestants.forEach((i) => {
                this.stopScooter(i.toString());
            });
            this.state.speed = [];
            this.setRaceMode = false;
            document.querySelector('.modal')?.remove();
            document
                .querySelector('.form')
                ?.querySelectorAll('[role]')
                .forEach((item: Node) => {
                    const btn = item as HTMLButtonElement;
                    btn.disabled = false;
                });
        }
    }

    protected resultChecker(time: number, id: string, name: string) {
        if (this.raceModeState) {
            const formattedTime = (time / 1000).toFixed(2) + 's';
            console.log(`${name} has won with time ${formattedTime}`);
            this.handleWinner(time, id, name);
        }
    }

    protected async handleWinner(time: number, id: string, name: string) {
        const formattedTime = Number((time / 1000).toFixed(2));
        const response = await super.getWinner(Number(id));
        if (!response.ok) {
            super.createWinner({ time: formattedTime, id: Number(id), wins: 1 }).then(() => this.getWinners(this.cbW));
        } else {
            const winnerToUpd = await response.json();
            const params =
                formattedTime < winnerToUpd.time
                    ? { wins: winnerToUpd.wins + 1, time: formattedTime }
                    : { wins: winnerToUpd.wins + 1, time: winnerToUpd.time };
            super
                .updateWinner(Number(id), params)
                .then((res) => {
                    if (!res.ok) throw Error;
                })
                .catch((err) => console.log(`${err}: check your server connection`))
                .finally(() => this.getWinners(this.cbW));
        }
        this.cbM({ name, time: formattedTime });
    }

    protected async startScooter(id: string): Promise<void> {
        const track = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
        const name = track.querySelector('.garage__name')?.textContent as string;
        const scooter = track.querySelector('.garage__vehicle') as HTMLElement;
        track.querySelectorAll('[role]').forEach((item: Node) => {
            const btn = item as HTMLButtonElement;
            btn.disabled = !btn.disabled;
        });
        let speed: number;
        let animation: Animation;
        super
            .startEngine(Number(id), 'started')
            .then((data) => {
                speed = data.distance / data.velocity;
                // this.state.speed.push(speed);
                const width = track.offsetWidth as number;
                // console.log(speed, name);
                animation = scooter.animate(
                    [{ transform: 'translateX(0)' }, { transform: `translateX(${width - 253}px)` }],
                    {
                        id: id,
                        duration: speed,
                        iterations: 1,
                        easing: 'linear',
                        fill: 'forwards',
                    }
                );
                this.state.animated[`${id}`] = animation;
                return super.driveEngine(Number(id), 'drive');
            })
            .then((res) => {
                if (!res.ok) throw Error;
                this.state.speed.push(speed);
                if (this.state.speed.length === 1) this.resultChecker(speed, id, name);
            })
            .catch(() => {
                console.log(`${name} failed`);
                animation.pause();
                scooter.classList.add('show-message');
                (scooter.querySelector('.garage__vehicle-msg') as HTMLSpanElement).innerHTML =
                    createRandomStopMessage();
            });
    }

    stopScooter(id: string) {
        const track = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
        const animation = this.state.animated[id];
        super
            .stopEngine(Number(id), 'stopped')
            .then(() => {
                if (animation) animation.cancel();
                delete this.state.animated[id];
                document.querySelectorAll('.show-message').forEach((el) => el.classList.remove('show-message'));
            })
            .catch((error) => console.log(error.message))
            .finally(() => {
                track.querySelectorAll('[role]').forEach((item: Node) => {
                    const btn = item as HTMLButtonElement;
                    btn.disabled = !btn.disabled;
                });
            });
    }

    private switchView(target: HTMLElement, btnType: ButtonType) {
        if (this.state.view === btnType) return;
        const activeClass = 'active-view';
        (document.querySelector('.active-view') as HTMLElement).classList.remove(activeClass);
        target.classList.add(activeClass);
        this.setViewState = ['view', btnType];
        const rankings = document.querySelector('.app__score') as HTMLElement;
        this.state.view === 'rankings' ? rankings.classList.add('visible') : rankings.classList.remove('visible');
    }

    private generateScooters() {
        for (let i = 0; i < 100; i += 1) {
            this.addScooter();
        }
        this.updateScooters(this.cb);
    }

    private enableFormUpdate(btn: HTMLElement) {
        const track = btn.closest('li') as HTMLLIElement;
        if (document.querySelector('.selected-track')) {
            document.querySelector('.selected-track')?.classList.remove('selected-track');
        }
        track.classList.add('selected-track');
        const form = document.querySelector('.form') as HTMLFormElement;
        form.classList.add('update-mode');
        const color = track.dataset['color'] as string;
        const name = (track.querySelector('.garage__name') as HTMLSpanElement).textContent as string;
        const id = track.dataset['id'];
        this.setIdToUpd = Number(id);
        document.querySelector('.hidden-btn')?.classList.remove('hidden-btn');
        (form.querySelector('input[type="color"]') as HTMLInputElement).value = color;
        (form.querySelector('input[type="text"]') as HTMLInputElement).focus();
        (form.querySelector('input[type="text"]') as HTMLInputElement).value = name;
        ((form.closest('.garage') as HTMLElement).querySelectorAll('button') as NodeList).forEach((btn) => {
            const btnEl = btn as HTMLButtonElement;
            if (btnEl.dataset['btn'] !== 'updateHidden') btnEl.disabled = true;
        });
    }

    handleSorting(el: HTMLElement) {
        if (el.classList.contains('active-sort') && el.classList.contains('reverse-order')) {
            el.classList.remove('reverse-order');
            this.state.sortOrder = Order.ASC;
        } else if (!el.classList.contains('active-sort')) {
            (document.querySelector('.active-sort') as HTMLElement).classList.remove('active-sort');
            el.classList.add('active-sort');
            el.dataset['btn'] === 'sort-wins' ? (this.state.sortType = Sort.wins) : (this.state.sortType = Sort.time);
            this.state.sortOrder = Order.ASC;
        } else if (el.classList.contains('active-sort')) {
            el.classList.add('reverse-order');
            this.state.sortOrder = Order.DESC;
        }
        this.getWinners(this.cbW);
        console.log(this.state);
    }

    set setViewState(data: [string, string]) {
        this.state.view = data[1];
    }

    set setIdToUpd(id: number) {
        this.state.idToUpd = id;
    }

    set setPageState(page: number) {
        this.state.page = page;
    }

    get stateIdToUpd() {
        return this.state['idToUpd'];
    }

    public listen(): void {
        document.addEventListener('click', (event: Event) => {
            if ((event.target as HTMLElement).tagName !== 'INPUT') event.preventDefault();
            const target = event.target as HTMLElement;
            if (target.getAttribute('role') !== 'button') return;
            let id;
            if (target.closest('li')) id = target.closest('li')?.dataset['id'] as string;

            const btnType = target.dataset['btn'] as ButtonType;

            switch (btnType) {
                case ButtonType.create:
                    (target as HTMLButtonElement).disabled = true;
                    this.addScooter(target);
                    break;
                case ButtonType.delete:
                    (target as HTMLButtonElement).disabled = true;
                    if (id) {
                        this.removeScooter(id);
                    }
                    break;
                case ButtonType.garage:
                    this.switchView(target, btnType);
                    break;
                case ButtonType.rankings:
                    this.switchView(target, btnType);
                    break;
                case ButtonType.generate:
                    (target as HTMLButtonElement).disabled = true;
                    this.generateScooters();
                    break;
                case ButtonType.pgnGarage:
                    (target as HTMLButtonElement).disabled = true;
                    this.setPageState = Number(target.textContent);
                    this.updateScooters(this.cb);
                    break;
                case ButtonType.change:
                    this.enableFormUpdate(target);
                    break;
                case ButtonType.updateHidden:
                    this.updateScooterData(target);
                    break;
                case ButtonType.go:
                    if (id) {
                        this.startScooter(id);
                    }
                    break;
                case ButtonType.stop:
                    if (id) {
                        this.stopScooter(id);
                    }
                    break;
                case ButtonType.race:
                    this.startRace();
                    break;
                case ButtonType.reset:
                    this.resetRace();
                    break;
                case ButtonType.sortTime:
                    this.handleSorting(target);
                    break;
                case ButtonType.sortWins:
                    this.handleSorting(target);
                    break;
                case ButtonType.pgnRankings:
                    this.state.winnersPage = Number(target.textContent);
                    this.getWinners(this.cbW);
            }
        });
    }
}
