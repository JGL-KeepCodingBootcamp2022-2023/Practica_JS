//IMPORTES
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

//TITTLE
printTitle('THE BATTTLESHIP SIMULATOR');

// GAME SETUP
setUpGame(playerA, playerAGrid);
setUpGame(playerB, playerBGrid);

// THE GAME STARTS

theGame(100); //Shoots per player

//THE GAME ENDS

printHeading('THE BATTTLESHIP SIMULATOR HAS ENDED');
printHeading(`THE WINNER IS: ${toWin(gridSize)}!!!`);

//SHOW FINAL RESULTS
showResults();
