//LAS IMPORTACIONES  
import usePrinter from './printer.js'
const { printHeading, printLine, print_Grid } = usePrinter()
import game from './game.js'
import { playerA, playerB, LANCHA, CRUCERO, SUBMARINO, BUQUE, PORTAAVIONES } from './data.js'
import { EMPTY, gridSize, playerAGrid, playerBGrid } from './board.js'


//✅ TÍTULO
printHeading('THE BATTTLESHIP SIMULATOR')
console.log('                        By Javier Girón López')
    //Texto con el título
//TODO SETUP DEL JUEGO

    //✅CREAR EL TABLERO DE JUGADOR A
    //✅CREAR EL TABLERO DE JUGADOR B
    
    // ✅CREAR LOS BARCOS PARA LOS JUGADORES
    game.setUpGame.shipsToPlayers(playerA)
    game.setUpGame.shipsToPlayers(playerB)
    //console.log(playerB.ships[0].PORTAAVIONES.life) // <-- Acceso a life Funcina
    //console.log(playerB.ships[0].PORTAAVIONES.figure) // <-- Acceso a figure funciona
    //console.log(playerA.ships)
    //COLOCAR LOS BARCOS
    //TODO meter todo esto en una función
   
    game.setUpGame.playerShip(playerA, playerAGrid)
    //game.setUpGame.playerShip(playerB, playerBGrid)
    
    //MOSTRAR TABLERO COMPLETO JUGADOR A
    printLine(`${playerA.name} Game Board`)
    print_Grid(playerAGrid)
    console.log()

    //MOSTRAR TABLERO COMPLETO JUGADOR B
    printLine(`${playerB.name} Game Board`)
    //print_Grid(playerBGrid)

   // 👀 METER BIEN EL ARRAY DE LAS POSICIONES
//✅ JUEGO COMIENZA
/*console.log(playerA.ships[0].PORTAAVIONES.position)
console.log(playerA.ships[1].BUQUE.position)
console.log(playerA.ships[2].SUBMARINO.position)
console.log(playerA.ships[3].SUBMARINO.position)
console.log(playerA.ships[4].CRUCERO.position)
console.log(playerA.ships[5].CRUCERO.position)
console.log(playerA.ships[6].CRUCERO.position)
console.log(playerA.ships[7].LANCHA.position)
console.log(playerA.ships[8].LANCHA.position)
console.log(playerA.ships[9].LANCHA.position)
//console.log(playerB.ships[0].PORTAAVIONES.position)*/
printHeading('THE BATTTLESHIP SIMULATOR STARTS')
console.log()
game.start()
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
printHeading('THE BATTTLESHIP SIMULATOR HAS ENDED')
//console.log( playerA.shootsLog, playerA.shoots)
//console.log( playerB.shootsLog, playerB.shoots)
printHeading(`THE WINNER IS: ${game.toWin()}`)

//✅ MOSTRAR TABLEROS FINALES
