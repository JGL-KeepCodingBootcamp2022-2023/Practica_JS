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
printTitle('THE BATTTLESHIP SIMULATOR', 'Javier Girón López');

//✅SETUP DEL JUEGO
setUpGame(playerA, playerAGrid);
setUpGame(playerB, playerBGrid);

// EL JUEGO COMIENZA

game.start(10);
//REPETICIÓN DE TURNOS 200 DISPAROS (100 POR JUGADOR)
//👀 ESTÁ FALLANDO ALGO EN EL DIBUJO DE LOS TABLEROS Y EL FIGURIN.
//👀 EL PRIMER FIGURIN FALLA PARA EL SHOOTER. NO LO MUESTRA.
//👀 CONTADOR DE RONDAS FALLA. VER CÓMO HACERLO.
//👀 FUNCION NEXTPLAYER PARA QUE LO HAGA BIEN, NO TODECIDE. PONER EN EL DO-WHILE? LA RONDA NO ACABA HASTA QUE FALLE
//TURNO DEL JUGADOR A
//INDICAR RONDA
//SUMAR RONDA
//Disparo:
// ^    ✅ver si se ha realizado
//    |        //✅si se ha realizado, volver a disparar
//    |        //✅si no se ha realizado,
//    |                //✅SUMAR DISPARO
//    |                //✅añadirlo al Log del jugador
//    |                    //✅ver si tocado o agua
//    |                 //✅Si agua
//    |                     //👀 figurin de agua en tablero enemigo <-- NO LO ESTÁ HACIENDO BIEN
//    |                     //👀 Siguiente jugador
//    |                 //Si tocado
//    |                     //👀figurita de fuego en tablero enemigo <-- NO LO ESTÁ HACIENDO BIEN
//    |                     👀 NO ME ESTÁ DICIENDO QUÉ BARCO HA TOCADO porque no está accediendo a esa info por el switch case
//    |                     //✅Restar vida al jugador
//    |-------------------- //✅Volver a disparar
//REPETIR HASTA QUE FALLE.

//TURNO JUGADOR B
//mismo que A

//✅ JUEGO TERMINA
printHeading('THE BATTTLESHIP SIMULATOR HAS ENDED');
//console.log( playerA.shootsLog, playerA.shoots)
//console.log( playerB.shootsLog, playerB.shoots)
printHeading(`THE WINNER IS: ${game.toWin()}`);

//✅ MOSTRAR TABLEROS FINALES
