import game from '../game.js';
import usePrinter from '../utils/printer.js';
const { printLine, print_Grid } = usePrinter();

export const setUpGame = (player, playerGrid) => {
    //CREATES THE PLAYER'S BOARD
    game.setUpGame.shipsToPlayers(player);

    //PLACES THE SHIPS
    game.setUpGame.playerShip(player, playerGrid);

    //MUESTRA EL TABLERO COMPLETO DEL JUGADOR
    printLine(`${player.name} Game Board`);
    print_Grid(playerGrid);
    console.log();
};

export const theGame = (shootsNumber) => {
    game.theGame.start(shootsNumber);
};
