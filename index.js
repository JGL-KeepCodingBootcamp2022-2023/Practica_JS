//LAS IMPORTACIONES
import usePrinter from './printer.js';
const { printHeading, printLine, print_Grid } = usePrinter();
import game from './game.js';
import {
    playerA,
    playerB,
    LANCHA,
    CRUCERO,
    SUBMARINO,
    BUQUE,
    PORTAAVIONES,
} from './data.js';
import { EMPTY, gridSize, playerAGrid, playerBGrid } from './board.js';
import { setUpGame } from './indexFunctions.js';
import { printTitle } from './utils.js';

//✅ TÍTULO
printTitle('THE BATTTLESHIP SIMULATOR');

//✅SETUP DEL JUEGO
setUpGame(playerA, playerAGrid);
setUpGame(playerB, playerBGrid);

// EL JUEGO COMIENZA

game.start(10);

//✅ JUEGO TERMINA
printHeading('THE BATTTLESHIP SIMULATOR HAS ENDED');
//console.log( playerA.shootsLog, playerA.shoots)
//console.log( playerB.shootsLog, playerB.shoots)
printHeading(`THE WINNER IS: ${game.toWin()}`);

//✅ MOSTRAR TABLEROS FINALES
