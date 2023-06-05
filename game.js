import {
    playerA,
    playerB,
    LANCHA,
    CRUCERO1,
    CRUCERO2,
    CRUCERO3,
    SUBMARINO1,
    SUBMARINO2,
    BUQUE,
    PORTAAVIONES,
    FIGURES,
} from './data/data.js';
import * as board from './board/board.js';
import { gridSize, EMPTY } from './board/board.js';
import usePrinter from './utils/printer.js';
import { random, toDead } from './utils/utils.js';
const { printHeading, printLine, print_Grid } = usePrinter();

export default {
    rondas: 0,

    setUpGame: {
        // Start-up functions of the game
        pos: 0,
        createBoards() {
            board.create_Grid(size), board.create_Headers(size);
        },

        // Creating ships for the players

        shipsToPlayers(player) {
            (player.ships = [
                {
                    id: 'Aircraft carrier',
                    PORTAAVIONES: JSON.parse(JSON.stringify(PORTAAVIONES)),
                },
                { id: 'Battleship', BUQUE: JSON.parse(JSON.stringify(BUQUE)) },
                {
                    id: 'Submarine 1',
                    SUBMARINO1: JSON.parse(JSON.stringify(SUBMARINO1)),
                },
                {
                    id: 'Submarino 2',
                    SUBMARINO2: JSON.parse(JSON.stringify(SUBMARINO2)),
                },
                {
                    id: 'Submarine 1',
                    CRUCERO1: JSON.parse(JSON.stringify(CRUCERO1)),
                },
                {
                    id: 'Cruise 2',
                    CRUCERO2: JSON.parse(JSON.stringify(CRUCERO2)),
                },
                {
                    id: 'Cruise 3',
                    CRUCERO3: JSON.parse(JSON.stringify(CRUCERO3)),
                },
                { id: 'Boat 1', LANCHA: JSON.parse(JSON.stringify(LANCHA)) },
                { id: 'Boat 2', LANCHA: JSON.parse(JSON.stringify(LANCHA)) },
                { id: 'Boat 3', LANCHA: JSON.parse(JSON.stringify(LANCHA)) },
            ]),
                (player.positions = []);
        },

        playerShip(player, playerGrid) {
            let i = 0;

            for (i = 0; i < 10; i++) {
                if (i == 0) {
                    this.placeShips(
                        player,
                        player.ships[i].PORTAAVIONES,
                        playerGrid
                    );
                } else if (i == 1) {
                    this.placeShips(player, player.ships[i].BUQUE, playerGrid);
                } else if (i == 2) {
                    this.placeShips(
                        player,
                        player.ships[i].SUBMARINO1,
                        playerGrid
                    );
                } else if (i == 3) {
                    this.placeShips(
                        player,
                        player.ships[i].SUBMARINO2,
                        playerGrid
                    );
                } else if (i == 4) {
                    this.placeShips(
                        player,
                        player.ships[i].CRUCERO1,
                        playerGrid
                    );
                } else if (i == 5) {
                    this.placeShips(
                        player,
                        player.ships[i].CRUCERO2,
                        playerGrid
                    );
                } else if (i == 6) {
                    this.placeShips(
                        player,
                        player.ships[i].CRUCERO3,
                        playerGrid
                    );
                } else {
                    this.placeShips(player, player.ships[i].LANCHA, playerGrid);
                }
            }
            player.life = player.positions.length;
        },

        paridad() {
            let a = random(0, gridSize);
            let paridad = '';
            a % 2 == 0 ? (paridad = true) : (paridad = false);
            return paridad;
        },

        firstShip(player, barco, coords, playerGrid, pass) {
            let horizontal = this.horizontal(barco, coords);
            let vetical = this.vertical(barco, coords);
            let parity = this.paridad();

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
            //POSITIONING THE AIRCRAFT CARRIER
            if (barco.life > 4) {
                do {
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
                    //Variable reset at the start of each cycle
                    pass = false;
                    let coords = this.randomCoords(barco);

                    //Checks whether the coordinate is free or not.

                    pass = this.freeSpace(player, coords);

                    //If free, test all coordinates for each ship.

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
            let x1 = random(0, max); //I get a random number for the maximum space in which this ship can be placed.
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
                    barco.position.push([...newCoords]);
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
                    barco.position.push([...newCoords]);
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
            let parity = this.paridad();
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

    theGame: {
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
            this.shooter.shootCoord = [...shootCoord]; //Assigns the shot to the shooting player's shootCoord property.
            return shootCoord;
        },

        toTestLog(shooter, shootCoord) {
            //Checks if the shot has been fired
            let shooterLog = [...shooter.shootsLog];
            let find = shooterLog.findIndex(
                (el) => el[0] === shootCoord[0] && el[1] === shootCoord[1]
            );
            return find;
        },

        toSeeEnemyGrid(shooter, enemy, turn) {
            turn = false;
            if (
                enemy.grid[shooter.shootCoord[1]][shooter.shootCoord[0]] !=
                EMPTY
            ) {
                enemy.grid[shooter.shootCoord[1]][shooter.shootCoord[0]] =
                    FIGURES[1];
                console.log(enemy.grid);
                this.icon = '🔥';
                turn = true;
            } else {
                enemy.grid[shooter.shootCoord[1]][shooter.shootCoord[0]] =
                    FIGURES[0];
                this.icon = '💧';
                turn = false;
            }
        },

        touchedAndSunk(life, shipFound) {
            if (life <= 0) {
                this.enemy.sunkenShips++;

                console.log();
                console.log(
                    `TOUCHED AND SUNK! The ship '${shipFound}' has been sunk. Well done!!`
                );
            }
        },

        showShootResults(shootCoord, find) {
            // Return Water if it misses or Touch if it hits an enemy ship.

            let icon;
            let finding = this.enemy.positions.findIndex(
                (el) => el[0] === shootCoord[0] && el[1] === shootCoord[1]
            );
            if (
                this.enemy.grid[this.shooter.shootCoord[1]][
                    this.shooter.shootCoord[0]
                ] == EMPTY &&
                finding === -1
            ) {
                icon = FIGURES[0];
                this.change = true;
                this.turn = false;
            } else {
                icon = FIGURES[1];
                this.change = false;
                this.turn = true;
            }

            icon = icon.substring(0, icon.length - 1);

            return [icon, (find = finding)];
        },

        manageResults(shootCoord, find) {
            let shipFound;
            let shipPositionValues;
            let life;
            let impacts;

            this.enemy.life--;

            for (let i = 0; i < this.enemy.ships.length; i++) {
                shipPositionValues = Object.values(this.enemy.ships[i])[1]
                    .position;
                life = Object.values(this.enemy.ships[i])[1].life;
                impacts = Object.values(this.enemy.ships[i])[1].impacts;
                find = shipPositionValues.findIndex(
                    (el) => el[0] == shootCoord[0] && el[1] == shootCoord[1]
                );

                if (
                    find != -1 &&
                    this.enemy.grid[shootCoord[1]][shootCoord[0]] != EMPTY
                ) {
                    shipFound = this.enemy.ships[i].id;
                    //Add impact coordinates and adjust ship's life.
                    impacts.push(shootCoord);
                    //Draw icon touched on enemy board
                    this.enemy.grid[shootCoord[1]][shootCoord[0]] = FIGURES[1];

                    life = shipPositionValues.length - impacts.length;

                    this.touchedAndSunk(life, shipFound);

                    break;
                }
            }
        },
        playerRound(change, shootsNumber, dead) {
            this.playerRounds = this.shooter.shootsLog.length;
            let finding;
            let find;
            let shootCoord;
            let icon;

            if (this.shooter.shoots < shootsNumber) {
                printLine(
                    `Round ${this.playerRounds} for ${this.shooter.name}`
                );

                if (this.playerRounds != 0) {
                    do {
                        shootCoord = this.toShoot();
                        finding = this.toTestLog(this.shooter, shootCoord);
                    } while (finding != -1);
                    //Show player's remaining shoots
                    console.log(
                        `Remaining ${this.shooter.name} shots: ${
                            shootsNumber - this.shooter.shoots
                        }`
                    );
                } else {
                    shootCoord = this.toShoot();
                }

                //Reset the shot and update the shots fired.
                this.shooter.shootsLog.push([...shootCoord]);
                this.shooter.shoots = this.shooter.shootsLog.length;

                //Result of the shot

                icon = this.showShootResults(shootCoord, find)[0];
                find = this.showShootResults(shootCoord, find)[1];

                console.log(
                    `Shoot #${
                        this.shooter.shoots
                    } pointing to ${String.fromCharCode(
                        this.shooter.shootCoord[0] + 65
                    )}${this.shooter.shootCoord[1]}: ${icon}`
                );

                if (find !== -1) {
                    this.manageResults(shootCoord, find);
                    change = false;
                } else {
                    //Draw Water icon on enemy board
                    this.enemy.grid[shootCoord[1]][shootCoord[0]] = FIGURES[0];
                    change = true;
                }
            } else {
                dead = true;
            }
            return change;
        },

        toPlay(change, dead, shootsNumber) {
            do {
                change = this.playerRound(change, shootsNumber, dead);

                dead = toDead(shootsNumber);

                printLine(`Own board`);
                print_Grid(this.shooter.grid);

                printLine(`Enemy board:  ${this.enemy.name}`);
                print_Grid(this.enemy.grid, true);
            } while (change === false && dead === false);

            return change;
        },

        playing(dead, turn, shootsNumber) {
            let playerRounds = 0;
            let change = true;

            //Player A round
            dead = toDead(shootsNumber);
            if (dead == false && playerA.shoots < shootsNumber) {
                this.toPlay(change, dead, shootsNumber);
                dead = toDead(shootsNumber);
            } else {
                dead = true;
            }

            if (dead === false && playerB.shoots < shootsNumber) {
                //Change players
                this.toDecide((turn = false));

                //Player B round
                this.toPlay(change, dead, shootsNumber);
                dead = toDead(shootsNumber);
            } else {
                dead = true;
            }

            return dead;
        },

        start(shootsNumber) {
            let dead = false;
            let round = 0;
            let turn;

            if (shootsNumber > gridSize * 10) {
                throw Error(
                    "Sorry, you can't shoot more times than there are squares on the board."
                );
            }

            printHeading('THE BATTTLESHIP SIMULATOR STARTS');

            do {
                //I force player A to start
                this.toDecide((turn = true));
                printLine(`ROUND ${round}`);

                dead = this.playing(dead, turn, shootsNumber);
                round++;
            } while (dead === false);
        },
    },
};
