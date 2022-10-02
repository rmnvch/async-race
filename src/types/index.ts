export interface ICar {
    name: string;
    color: string;
    id: number;
}

export interface IDrawArgs {
    page: number;
    data: ICar[];
    qty: number;
}

export interface IWinners {
    total: number;
    page: number;
    data: IWinner[];
}

export interface IWinner extends ICar {
    wins: number;
    time: number;
}

export interface IWinnerResp {
    id: number;
    wins: number;
    time: number;
}

export type TGarageCallback = {
    (data: IDrawArgs): void;
};

export type TRankingsCallback = {
    (data: IWinners, state: IRankingsArgsState): void;
};

export type TModalCallback = {
    (data: { name: string; time: number }): void;
};

export type TCallback = {
    (): void;
};

export enum Sort {
    wins = 'wins',
    time = 'time',
}

export enum Order {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum ButtonType {
    go = 'go',
    stop = 'stop',
    change = 'change',
    delete = 'delete',
    create = 'create',
    reset = 'reset',
    generate = 'generate',
    garage = 'garage',
    rankings = 'rankings',
    pgnGarage = 'pgn-garage',
    pgnRankings = 'pgn-rankings',
    updateHidden = 'updateHidden',
    race = 'race',
    sortWins = 'sort-wins',
    sortTime = 'sort-time',
}

export interface IState {
    page: number;
    winnersPage: number;
    view: string;
    idToUpd: number;
    animated: { [N: string]: Animation };
    idOnPage: number[];
    speed: number[];
    raceMode: boolean;
    sortType: Sort;
    sortOrder: Order;
}

export interface IRankingsArgsState {
    view: string;
    page: number;
    sort: Sort;
    order: Order;
}
