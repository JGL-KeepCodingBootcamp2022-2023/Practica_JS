import {
    playerA,
    playerB,
    LANCHA,
    CRUCERO,
    SUBMARINO,
    BUQUE,
    PORTAAVIONES,
    FIGURES,
} from './data.js';
import * as board from './board.js';
import { gridSize, EMPTY, playerAGrid, playerBGrid } from './board.js';
import usePrinter from './printer.js';
import { random, toDead } from './utils.js';
const { printHeading, printLine, print_Grid } = usePrinter();

export default {
    rondas: 0,

    setUpGame: {
        // funciones de inicio del juego
        pos: 0,
        createBoards() {
            board.create_Grid(size), board.create_Headers(size);
        },

        // ✅ Crear barcos para los jugadores

        shipsToPlayers(player) {
            (player.ships = [
                { id: 'Portaaviones', PORTAAVIONES },
                { id: 'Buque', BUQUE },
                { id: 'Submarino 1', SUBMARINO },
                { id: 'Submarino 2', SUBMARINO },
                { id: 'Crucero 1', CRUCERO },
                { id: 'Crucero 2', CRUCERO },
                { id: 'Crucero 3', CRUCERO },
                { id: 'Lancha 1', LANCHA: JSON.parse(JSON.stringify(LANCHA)) },
                { id: 'Lancha 2', LANCHA: JSON.parse(JSON.stringify(LANCHA)) },
                { id: 'Lancha 3', LANCHA: JSON.parse(JSON.stringify(LANCHA)) },
            ]),
                (player.positions = []);
        },

        playerShip(player, playerGrid) {
            let i = 0;
            for (i = 0; i < 10; i++) {
                if (i == 0) {
                    this.pos = i;
                    this.placeShips(
                        player,
                        player.ships[i].PORTAAVIONES,
                        playerGrid
                    );
                } else if (i == 1) {
                    this.pos = i;
                    this.placeShips(player, player.ships[i].BUQUE, playerGrid);
                } else if (i == 2 || i == 3) {
                    this.pos = i;
                    this.placeShips(
                        player,
                        player.ships[i].SUBMARINO,
                        playerGrid
                    );
                } else if (i == 4 || i == 5 || i == 6) {
                    this.pos = i;
                    this.placeShips(
                        player,
                        player.ships[i].CRUCERO,
                        playerGrid
                    );
                } else {
                    this.pos = i;
                    this.placeShips(player, player.ships[i].LANCHA, playerGrid);
                }
            }
            player.life = player.positions.length;
        },

        paridad(array, barco) {
            let a = random(0, gridSize);
            let paridad = '';
            a % 2 == 0 ? (paridad = true) : (paridad = false);
            return paridad;
        },

        firstShip(player, barco, coords, playerGrid, pass) {
            let horizontal = this.horizontal(barco, coords);
            let vetical = this.vertical(barco, coords);
            let parity = this.paridad(coords, barco);

            pass = this.testCoords(barco, coords, playerGrid, player, pass);

            return pass;
        },

        freeSpace(player, coords, pass) {
            let find;
            for (let i = 0; i < player.positions.length; i++) {
                find = player.positions[i].findIndex(
                    (element) =>
                        element[0] === coords[0] && element[1] === coords[1]
                );
                pass = this.passValue(find, pass);
            }
            return pass;
        },

        placeShips(player, barco, playerGrid) {
            let pass;
            //COLOCAR EL PORTAAVIONES
            if (barco.life > 4) {
                do {
                    //Obtenemos array de coordenadas y fija la primera del barco
                    let coords = this.randomCoords(barco);

                    pass = this.firstShip(
                        player,
                        barco,
                        coords,
                        playerGrid,
                        pass
                    );
                } while (pass == false);
            } else {
                do {
                    //Reset variables al inicio de cada ciclo
                    pass = false;
                    let coords = this.randomCoords(barco);

                    //Comprueba si está libre o no la coordenada

                    pass = this.freeSpace(player, coords);

                    //Si está libre, testea todas las coordenadas para cada barco

                    pass = true
                        ? (pass = this.testCoords(
                              barco,
                              coords,
                              playerGrid,
                              player,
                              pass
                          ))
                        : (pass = false);
                } while (pass == false);
            }

            this.place(player, barco, playerGrid);
        },

        randomCoords(barco) {
            let max = gridSize - barco.life;
            let x1 = random(0, max); //Obtengo un número aleatorio para el espacio máximo en el que puede colocarse este barco.
            let y1 = Math.floor(Math.random() * gridSize);
            let coords = [x1, y1];

            return coords;
        },

        passValue(find, pass) {
            find = -1 ? (pass = true) : (pass = false);
            return pass;
        },

        horizontal(barco, coords) {
            let horizontal = barco.life + coords[0];
            if (horizontal > gridSize - 1) {
                return (horizontal = false);
            } else {
                return (horizontal = true);
            }
        },

        vertical(barco, coords) {
            let vertical = barco.life + coords[1];

            if (vertical > gridSize - 1) {
                return (vertical = false);
            } else {
                return (vertical = true);
            }
        },

        verticalDraw(barco, coords, playerGrid, pass) {
            let newCoords;
            barco.position = [[...coords]];
            for (let j = 0; j < barco.life; j++) {
                if (playerGrid[coords[1]][coords[0]] == EMPTY) {
                    newCoords = [coords[0], (coords[1] = ++coords[1])];
                    barco.position.push(newCoords);
                } else {
                    barco.position.length = 0;
                    pass = false;
                    break;
                }
            }

            if (barco.position.length > barco.life) {
                barco.position.pop();
                return (pass = true);
            } else {
                return (pass = false);
            }
        },

        horizontalDraw(barco, coords, playerGrid, pass) {
            let newCoords;
            barco.position = [[...coords]];
            for (let j = 0; j < barco.life; j++) {
                if (playerGrid[coords[1]][coords[0]] == EMPTY) {
                    newCoords = [(coords[0] = ++coords[0]), coords[1]];
                    barco.position.push(newCoords);
                } else {
                    barco.position.length = 0;
                    pass = false;
                    break;
                }
            }

            if (barco.position.length > barco.life) {
                barco.position.pop();
                return (pass = true);
            } else {
                return (pass = false);
            }
        },

        testCoords(barco, coords, playerGrid, player, pass) {
            let horizontal = this.horizontal(barco, coords);
            let vetical = this.vertical(barco, coords);
            let parity = this.paridad(coords, barco);
            if (horizontal == true && vetical == true) {
                parity
                    ? (pass = this.horizontalDraw(
                          barco,
                          coords,
                          playerGrid,
                          pass
                      ))
                    : (pass = this.verticalDraw(
                          barco,
                          coords,
                          playerGrid,
                          pass
                      ));
            } else if (parity == true && horizontal == true) {
                pass = this.horizontalDraw(barco, coords, playerGrid, pass);
            } else if (parity == false && vetical == true) {
                pass = this.verticalDraw(barco, coords, playerGrid, pass);
            } else {
                pass = false;
            }
            pass ? player.positions.push(...barco.position) : (pass = false);

            return pass;
        },

        place(player, barco, playerGrid) {
            for (let i = 0; i < barco.life; i++) {
                playerGrid[barco.position[i][1]][barco.position[i][0]] =
                    barco.figure;
            }
        },
    },

    /*theShooterIs(shooter, enemy, turn) {
        if (turn === false) {
            let change = shooter;
            this.shooter = enemy;
            this.enemy = change;
        }
        return this.shooter, this.enemy;
    },*/

    toDecide(turn) {
        if (turn === true) {
            this.shooter = playerA;
            this.enemy = playerB;
        } else {
            this.shooter = playerB;
            this.enemy = playerA;
        }
        return this.shooter, this.enemy;
    },

    toShoot() {
        let x = random(0, gridSize - 1);
        let y = random(0, gridSize - 1);
        let shootCoord = [x, y];
        this.shooter.shootCoord = [...shootCoord]; //Asigna el disparo a la propiedad shootCoord del jugador que dipara
        return shootCoord;
    },

    toTestLog(shooter, shootCoord) {
        console.log('~~ Ya comprobando el disparo ~~');
        //Compruebo si el disparo se ha realizado
        let shooterLog = [...shooter.shootsLog];
        let find = shooterLog.findIndex(
            (el) => el[0] === shootCoord[0] && el[1] === shootCoord[1]
        );
        if (find == -1) {
            console.log('nuevo ShootLog: ', shootCoord);
        } else {
            //Repite disparo
            console.log('Hay que repetir el disparo');
        }
        return find;
    },

    ship(shooter, enemy) {
        //life position 2 --> NO FUNCIONA PORQUE ESTÁ MIRANDO EN SHOOTLOG, NO EN POSICIONES BARCOS
        let touched = this.enemy.shootsLog.findIndex((elemento) => {
            elemento[0] === this.shooter.shootCoord[0] &&
                elemento[1] === this.shooter.shootCoord[1];
        });
        console.log(`Posición a buscar en es ${touched}`);
        switch (touched) {
            case touched == 0 ||
                touched == 1 ||
                touched == 2 ||
                touched == 3 ||
                touched == 4:
                this.enemy.ship0[2]--;
                if (this.enemy.ship0[2] != 0) {
                    console.log(`Enemy ${this.enemy.ship0[0]} touched!`);
                } else {
                    console.log(
                        `Enemy ${this.enemy.ship0[0]} touched & drawn!`
                    );
                }
                break;
            case touched == 5 || touched == 6 || touched == 7 || touched == 8:
                this.enemy.ship1[2]--;
                if (this.enemy.ship1[2] != 0) {
                    console.log(`Enemy ${this.enemy.ship1[0]} touched!`);
                } else {
                    console.log(
                        `Enemy ${this.enemy.ship1[0]} touched & drawn!`
                    );
                }
                break;
            case touched == 9 || touched == 10 || touched == 11:
                this.this.enemy.ship2[2]--;
                if (this.enemy.ship2[2] != 0) {
                    console.log(`Enemy ${this.enemy.ship2[0]} touched!`);
                } else {
                    console.log(
                        `Enemy ${this.enemy.ship2[0]} touched & drawn!`
                    );
                }
                break;
            case touched == 12 || touched == 13 || touched == 14:
                this.enemy.ship3[2]--;
                if (enemy.ship3[2] != 0) {
                    console.log(`Enemy ${this.enemy.ship3[0]} touched!`);
                } else {
                    console.log(
                        `Enemy ${this.enemy.ship3[0]} touched & drawn!`
                    );
                }
                break;
            case touched == 15 || touched == 16:
                this.enemy.ship4[2]--;
                if (this.enemy.ship4[2] != 0) {
                    console.log(`Enemy ${this.enemy.ship4[0]} touched!`);
                } else {
                    console.log(
                        `Enemy ${this.enemy.ship4[0]} touched & drawn!`
                    );
                }
                break;
            case touched == 17 || touched == 18:
                this.enemy.ship5[2]--;
                if (this.enemy.ship5[2] != 0) {
                    console.log(`Enemy ${this.enemy.ship5[0]} touched!`);
                } else {
                    console.log(
                        `Enemy ${this.enemy.ship5[0]} touched & drawn!`
                    );
                }
                break;
            case touched == 19 || touched == 20:
                this.enemy.ship6[2]--;
                if (this.enemy.ship6[2] != 0) {
                    console.log(`Enemy ${this.enemy.ship6[0]} touched!`);
                } else {
                    console.log(
                        `Enemy ${this.enemy.ship6[0]} touched & drawn!`
                    );
                }
                break;
            case touched == 21:
                this.enemy.ship7[2]--;
                console.log(`Enemy ${this.enemy.ship7[0]} touched & drawn!`);
                break;
            case touched == 22:
                this.enemy.ship8[2]--;
                console.log(`Enemy ${this.enemy.ship8[0]} touched & drawn!`);
                break;
            case touched == 23:
                this.enemy.ship9[2]--;
                console.log(`Enemy ${this.enemy.ship9[0]} touched & drawn!`);
                break;
        }
    },

    toSeeEnemyGrid(shooter, enemy, turn) {
        turn = false;
        if (enemy.grid[shooter.shootCoord[1]][shooter.shootCoord[0]] != EMPTY) {
            enemy.grid[shooter.shootCoord[1]][shooter.shootCoord[0]] =
                FIGURES[1];
            enemy.life--;
            this.icon = '🔥';
            this.ship(enemy); //TODO Ver qué barco ha tocado y quitarle una vida
            turn = true;
        } else {
            enemy.grid[shooter.shootCoord[1]][shooter.shootCoord[0]] =
                FIGURES[0];
            this.icon = '💧';
            turn = false;
        }
        return this.icon;
    },

    /*touchedAndSunk(barco){
        barco.life--
        if(barco.life == 0) {
            console.log(`The ship ${barco.id} has been sunk. Well done!!`)
        }
        else {
            //función next player
        }
    }*/
    showResults(shootCoord, find) {
        // Devuelve el dibujo de Agua si falla o Tocado si acierta en un barco enemigo.
        //Doble comprobación: Si la casilla enemiga está vacía y si la coordenada de disparo no coincide con ninguna coordenada de barco enemigo
        let icon;
        let finding = this.enemy.positions.findIndex(
            (el) => el[0] === shootCoord[0] && el[1] === shootCoord[1]
        );
        if (
            this.enemy.grid[this.shooter.shootCoord[1]][
                this.shooter.shootCoord[0]
            ] == EMPTY &&
            finding == -1
        ) {
            icon = FIGURES[0];

            this.turn = false;
        } else {
            icon = FIGURES[1];

            this.turn = true;
        }

        icon = icon.substring(0, icon.length - 1);

        return [icon, (find = finding)];
    },

    mangeResults(shootCoord, find) {
        //Elimina shootCoord de positions en el enemigo
        console.log('entramos en manegeRresults');
        console.log(find);
        console.log(this.enemy.positions);

        this.enemy.positions.splice(find, 1);
        console.log(this.enemy.positions);
        /*let finding = enemy.shootsLog.findIndex((el) => {
            el[0] == shootCoord[0] && elemento[1] == shootCoord[1];
            console.log(finding);
        });*/
    },
    playerRound() {
        this.playerRounds = this.shooter.shootsLog.length;
        let find;
        let shootCoord;
        let icon;

        console.log();
        printLine(`Round ${this.playerRounds} for ${this.shooter.name}`);

        //eliminar coordenada de player positions

        if (this.playerRounds != 0) {
            console.log('YA HAY DISPAROS');
        } else {
            console.log('MI PRIMER DISPARO!!');
            shootCoord = this.toShoot();
            console.log('el diapro es: ', shootCoord);
        }

        //Resgitro el disparo y actualizo los disparos realizados
        this.shooter.shootsLog.push([...shootCoord]);
        this.shooter.shoots = this.shooter.shootsLog.length;

        console.log('shootsLog: ', this.shooter.shootsLog);

        //Resultado del disparo

        icon = this.showResults(shootCoord)[0];
        find = this.showResults(shootCoord)[1];

        console.log(
            `Shoot #${this.shooter.shoots} pointing to ${String.fromCharCode(
                this.shooter.shootCoord[0] + 65
            )}${this.shooter.shootCoord[1]}: ${icon}`
        );
        if (find != -1) {
            this.mangeResults(shootCoord, find);
        }

        return this.turn;

        //VOLVER A MIRAR

        //buscar la coordenada en cada barco (forEach?) de enemy
        //Cuando lo encuentre, añadir eswa coord al impacto.
        //Vida del barco el barco.positions.length - barco.impacts.length
        //SI VIDA BARCO = 0 => INDICAR QUÉ BARCO HUNDIDO SE HA.*/

        //return (this.turn = false);
    },

    toPlay() {
        this.playerRound();
        /*while (this.turn = true && this.enemy.life > 0) {
            this.turn = this.playerRound(
                this.shooter,
                this.enemy,
                this.playerRounds,
                //this.turn
                );
                console.log('antes de salir en toPlay ciclo while; turn Vale: ', this.turn)
        }*/

        //return turn;
    },

    playing(dead, turn) {
        let playerRounds = 0;

        //ronda del jugador shooter
        turn = this.toPlay();
        dead = toDead();

        //Cambio de roles de los jugadores
        this.toDecide(turn);

        console.log();
        console.log('~~ CAMBIO DE TURNO ~~');

        //ronda del nuevo shooter (jugador que antes del cambio de rol era enemy)
        turn = this.toPlay();
        turn = true;
        // dead = toDead();

        //Cambio de roles de los jugadores para empezar nueva Ronda Completa de juego
        this.toDecide(turn);

        console.log();
        console.log('~~ CAMBIO DE TURNO ~~');

        return (dead = true);
    },

    start(shootsNumber) {
        let shooter;
        let enemy
        let dead = false;
        let round = 0;
        let icon
        let life = 0;
        let life1 = 1;
        let turn = true;
        playerA.life = playerA.positions.length
        playerB.life = playerB.positions.length
        console.log('playerA.life; ', playerA.life);
        console.log('playerB.life :', playerB.life);

        printHeading('THE BATTTLESHIP SIMULATOR STARTS');
        // Empieza con el jugador A
        this.toDecide(turn);

        do {
            //NO SE ESTÁ CUMPLIENDO LOS DISPAROS DE LOS JUGADORES
            //PLAYING ES LA RONDA COMPLETA
            printLine(`ROUND ${round}`);

            dead = this.playing(dead, turn);
            round++;

            console.log('playerA.life; ', playerA.life);
            console.log('playerB.life :', playerB.life);

            console.log('Disparos A: ', playerA.shoots);
            console.log('Disparos B: ', playerB.shoots);
        } while ((dead = false && playerA.shoots < 5 && playerB.shoots < 5));
        /*do {

                console.log(playerA.life)
                console.log(playerB.life)
                /*console.log(`Shoot #${this.shooter.shoots} pointing to ${String.fromCharCode(this.shooter.shootCoord[0] + 65)}${this.shooter.shootCoord[1]}: ${icon}`)
                icon = this.toSeeEnemyGrid(this.shooter, this.enemy, this.icon, turn)             // Miro el disparo en el tablero del enemigo
                console.log()
                printLine('Own board')
                print_Grid(this.shooter.grid)
                
                console.log()
                printLine('Enemy board')
                print_Grid(this.enemy.grid, true)
                console.log(`La vida de ${this.shooter.name} es de ${this.shooter.life}`) //Borar
                console.log(`La vida de ${this.enemy.name} es de ${this.enemy.life}`) //Borrar
                this.totalShoots++
                countRound++        //MODIFICAR PARA EL TOTAL Y PARA CADA JUGADOR
                life1 = this.enemy.life
            } while ((dead = false));*/
    },

    toWin() {
        switch (this.totalShoots <= 200) {
            case playerA.life > playerB.life:
                return playerA.name;
                break;
            case playerA.life < playerB.life:
                return playerB.name;
                break;
            default:
                return "Sorry, there isn't any winner. Try again.";
        }
    },
};
