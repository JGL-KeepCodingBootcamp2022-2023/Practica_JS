//IMPORTS
import usePrinter from './utils/printer.js';
const { printHeading } = usePrinter();

import { playerA, playerB } from './data/data.js';
import { gridSize, playerAGrid, playerBGrid } from './board/board.js';
import { setUpGame, theGame } from './utils/indexFunctions.js';
import { printTitle, showResults, toWin } from './utils/utils.js';

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

printHeading('Thank you for playing BATTTLESHIP SIMULATOR');
