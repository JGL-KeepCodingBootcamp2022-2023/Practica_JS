import { playerAGrid, playerBGrid } from '../board/board.js';

class PLAYER {
    constructor(name, grid, life, shoots, shootCoord, shootsLog, sunkenShips) {
        this.name = name;
        this.grid = grid;
        this.life = life;
        this.shoots = shoots;
        this.shootCoord = shootCoord;
        this.shootsLog = shootsLog;
        this.sunkenShips = sunkenShips;
    }
}
export const playerA = new PLAYER('Player A', playerAGrid, 0, 0, [], [], 0);
export const playerB = new PLAYER('Player B', playerBGrid, 0, 0, [], [], 0);

class TYPESHIP {
    constructor(figure, life, position, impacts) {
        this.figure = figure;
        this.life = life;
        this.position = position;
        this.impacts = impacts;
    }
}

export const LANCHA = new TYPESHIP('🛶  |', 1, [], []);
export const CRUCERO = new TYPESHIP('🚤  |', 2, [], []);
export const CRUCERO1 = new TYPESHIP('🚤  |', 2, [], []);
export const CRUCERO2 = new TYPESHIP('🚤  |', 2, [], []);
export const CRUCERO3 = new TYPESHIP('🚤  |', 2, [], []);
export const SUBMARINO = new TYPESHIP(' 🛳  |', 3, [], []);
export const SUBMARINO1 = new TYPESHIP(' 🛳  |', 3, [], []);
export const SUBMARINO2 = new TYPESHIP(' 🛳  |', 3, [], []);
export const BUQUE = new TYPESHIP(' 🛥  |', 4, [], []);
export const PORTAAVIONES = new TYPESHIP('🚢  |', 5, [], []);

export const FIGURES = [' 💧 |', ' 🔥 |'];
