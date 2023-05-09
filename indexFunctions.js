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
import usePrinter from './printer.js'
const { printHeading, printLine, print_Grid } = usePrinter();

export const setUpGame = (player, playerGrid) => {
    //✅CREAR EL TABLERO DEL JUGADOR
    game.setUpGame.shipsToPlayers(player);

    // ✅CREAR LOS BARCOS PARA EL JUGADOR
    //✅COLOCAR LOS BARCOS
    game.setUpGame.playerShip(player, playerGrid);

    //MOSTRAR TABLERO COMPLETO DEL JUGADOR
    printLine(`${player.name} Game Board`);
    print_Grid(playerGrid);
    console.log();
};
