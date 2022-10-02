import { ICar, Sort, Order, IWinner } from '../../types/index';

export default class Loader {
    base;
    garage;
    winners;
    engine;
    LIMIT_PER_PAGE;
    constructor() {
        this.base = 'https://rmnvch-async-race-api.herokuapp.com';
        this.garage = `${this.base}/garage`;
        this.engine = `${this.base}/engine`;
        this.winners = `${this.base}/winners`;
        this.LIMIT_PER_PAGE = 7;
    }

    protected async getScootersData(page: number) {
        const response = await fetch(`${this.garage}?_page=${page}&_limit=${this.LIMIT_PER_PAGE}`);

        return {
            data: (await response.json()) as ICar[],
            qty: Number(response.headers.get('X-total-count')),
            page: Number(page),
        };
    }

    protected async getWinnersData(page: number, sort: Sort, order: Order) {
        const response = await fetch(
            `${this.winners}?_page=${page}&_limit=${this.LIMIT_PER_PAGE}&_sort=${sort}&_order=${order}`
        );

        const data = await response.json();

        const res = await data.reduce(async (acc: IWinner[], curr: ICar) => {
            const car = await this.getScooter(curr.id);
            const obj = Object.assign(car, curr);
            (await acc).push(obj);
            return acc;
        }, []);

        return {
            data: res as IWinner[],
            total: Number(response.headers.get('X-total-count')),
            page: Number(page),
        };
    }

    protected async getScooter(id: number) {
        try {
            const response = await fetch(`${this.garage}/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    protected async updateScooter(id: number, data: { name: string; color: string }) {
        await fetch(`${this.garage}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    protected async createScooter(data: { name: string; color: string }) {
        await fetch(this.garage, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    protected async startEngine(id: number, status: string) {
        const response = await fetch(`${this.engine}?id=${id}&status=${status}`, { method: 'PATCH' });
        return await response.json();
    }

    protected stopEngine(id: number, status: string) {
        return fetch(`${this.engine}?id=${id}&status=${status}`, { method: 'PATCH' });
    }

    protected driveEngine(id: number, status: string) {
        return fetch(`${this.engine}?id=${id}&status=${status}`, { method: 'PATCH' });
    }

    protected async deleteScooter(id: string) {
        this.deleteWinner(id);
        return await fetch(`${this.garage}/${Number(id)}`, { method: 'DELETE' });
    }

    protected async deleteWinner(id: string) {
        try {
            const response = await fetch(`${this.winners}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                console.log(`id: ${id} had zero wins`);
            }
        } catch (error) {
            console.log('Возникла проблема с вашим fetch запросом: ', (error as Error).message);
        }
    }

    protected async getWinner(id: number) {
        return await fetch(`${this.winners}/${id}`);
    }

    protected async createWinner(data: { id: number; wins: number; time: number }) {
        const response = await fetch(`${this.winners}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    }

    protected async updateWinner(id: number, data: { wins: number; time: number }) {
        return await fetch(`${this.winners}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
}
