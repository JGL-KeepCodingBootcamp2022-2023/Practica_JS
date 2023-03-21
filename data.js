import { playerAGrid, playerBGrid } from "./board.js";
class BARCO  {
    constructor (typeship){
        this.typeship = typeship
    }
    //métodos que necesitan los barcos
    
    //function lengthRest --> Restar vida al barco
    //function touched --> A quién le ha dado un disparo
    //function touchedAndSunk --> nos dice qué barco se ha hundido
}
class TYPESHIP {
    constructor (figure, life, position) {
        this.figure = figure;
        this.life = life;
        this.position = position;
    }
}

export const LANCHA = new TYPESHIP('🛶  |', 1, [])
export const CRUCERO = new TYPESHIP('🚤  |', 2, [])
export const SUBMARINO = new TYPESHIP(' 🛳  |', 3, [])
export const BUQUE = new TYPESHIP(' 🛥  |', 4,  [])
export const PORTAAVIONES = new TYPESHIP('🚢  |', 5, [])

class PLAYER {
    constructor (name, grid, life, shoots, shootCoord, shootsLog, ship0, ship1, ship2, ship3, ship4, ship5, ship6, ship7, ship8, ship9){
        this.name = name;
        this.grid = grid;
        this.life = life;
        this.shoots = shoots;
        this.shootCoord = shootCoord;
        this.shootsLog = shootsLog;
        this.ship0 = ship0;
        this.ship1 = ship1;
        this.ship2 = ship2;
        this.ship3 = ship3;
        this.ship4 = ship4;
        this.ship5 = ship5;
        this.ship6 = ship6;
        this.ship7 = ship7;
        this.ship8 = ship8;
        this.ship9 = ship9;
    }
    //Métodos que necesita cada jugador

    /*
    //Colocar CUALQUIER BARCO en el tablero
    toPlace (ship, x1, y1){
        let totalposition = []
        console.log (randomCoords)
       this.ship[ship].position.push(Object.assign([], randomCoords))
        for(let i = 0; i < (this.ship[ship].life-1); i++){
                totalposition.push(randomCoords.map(e => e))
                randomCoords[0] = ++x1
                //Object.assign(this.ship[ship].position.push(randomCoords.map(e => e)))
                (this.ship[ship].position.push(randomCoords.map(e => e)))
            }
    }*/

};
export const playerA = new PLAYER(
    'Player A',
    playerAGrid,
    2,
    0,
    [],
    [], //Lo siguiente es nueva añadidura que puede que borrarse
    ['Portaaviones', '🚢  |', 5, []],  //0
    ['Buque', '🛥  |', 4,  []],         //1
    ['Submarino 1', ' 🛳  |', 3, []],  //2
    ['Submarino 2', ' 🛳  |', 3, []],
    ['Crucero 1', '🚤  |', 2, []], //4
    ['Crucero 2', '🚤  |', 2, []],
    ['Crucero 3', '🚤  |', 2, []],
    ['Lancha 1', '🛶  |', 1, []], //7
    ['Lancha 2', '🛶  |', 1, []],
    ['Lancha 3', '🛶  |', 1, []]
)
export const playerB = new PLAYER('Player B', playerBGrid, 2, 0, [], [])

export const FIGURES = [' 💧 |', ' 🔥 |'];

//console.log(PORTAAVIONES.figure)

//console.log(playerA.ship9[2])