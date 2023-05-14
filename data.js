import { playerAGrid, playerBGrid } from './board.js';

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
export const SUBMARINO = new TYPESHIP(' 🛳  |', 3, [], []);
export const BUQUE = new TYPESHIP(' 🛥  |', 4, [], []);
export const PORTAAVIONES = new TYPESHIP('🚢  |', 5, [], []);

class PLAYER {
    constructor(
        name,
        grid,
        life,
        shoots,
        shootCoord,
        shootsLog,
    ) {
        this.name = name;
        this.grid = grid;
        this.life = life;
        this.shoots = shoots;
        this.shootCoord = shootCoord;
        this.shootsLog = shootsLog;
    }

}
export const playerA = new PLAYER(
    'Player A',
    playerAGrid,
    0,
    0,
    [],
    [], //Lo siguiente es nueva añadidura que puede que borrarse
    /*['Portaaviones', '🚢  |', 5, [], []], //0
    ['Buque', '🛥  |', 4, [], []], //1
    ['Submarino 1', ' 🛳  |', 3, [], []], //2
    ['Submarino 2', ' 🛳  |', 3, [], []],
    ['Crucero 1', '🚤  |', 2, [], []], //4
    ['Crucero 2', '🚤  |', 2, [], []],
    ['Crucero 3', '🚤  |', 2, [], []],
    ['Lancha 1', '🛶  |', 1, [], []], //7
    ['Lancha 2', '🛶  |', 1, [], []],
    ['Lancha 3', '🛶  |', 1, [], []]*/
);
export const playerB = new PLAYER('Player B', playerBGrid, 0, 0, [], []);

export const FIGURES = [' 💧 |', ' 🔥 |'];

//console.log(PORTAAVIONES.figure)

//console.log(playerA.ship9[2])
