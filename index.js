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
import { setUpGame, theGame } from './indexFunctions.js';
import { printTitle, showResults, toWin } from './utils.js';

//✅ TÍTULO
printTitle('THE BATTTLESHIP SIMULATOR');

//✅SETUP DEL JUEGO
setUpGame(playerA, playerAGrid);
setUpGame(playerB, playerBGrid);

// EL JUEGO COMIENZA

theGame(50); //Shoots per player

//✅ JUEGO TERMINA

printHeading('THE BATTTLESHIP SIMULATOR HAS ENDED');
printHeading(`THE WINNER IS: ${toWin(gridSize)}!!!`);

showResults();

//✅ MOSTRAR TABLEROS FINALES
