import { playerA, playerB, LANCHA, CRUCERO, SUBMARINO, BUQUE, PORTAAVIONES, FIGURES} from './data.js'
import * as board from './board.js'
import { gridSize, EMPTY, playerAGrid, playerBGrid } from './board.js'
import usePrinter from './printer.js'
const { printHeading, printLine, print_Grid } = usePrinter()

export default {
    rondas: 0,
    totalShoots: 0,
    setUpGame: {  // funciones de inicio del juego      
        pos: 0,
        createBoards() {
            board.create_Grid(size),
            board.create_Headers(size)
        },    
        
        // ✅ Crear barcos para los jugadores

        shipsToPlayers(player){
            player.ships = [
                {id: 'Portaaviones', PORTAAVIONES},
                {id: 'Buque', BUQUE},
                {id: 'Submarino1', SUBMARINO}, 
                {id: 'Submarino2', SUBMARINO},
                {id: 'Crucero1', CRUCERO}, 
                {id: 'Crucero2', CRUCERO},
                {id: 'Crucero3', CRUCERO},
                {id: 'Lancha1', LANCHA},
                {id: 'Lancha2', LANCHA},
                {id: 'Lancha3', LANCHA}
            ],
            player.positions = [[],[],[],[],[],[],[],[],[],[]]
        },


        playerShip(player, playerGrid){
            let i = 0;
            for (i = 0; i < 10; i++){
                if (i == 0){
                    this.pos = i;
                    this.placeShips(player, player.ships[i].PORTAAVIONES, playerGrid)
               }
                else if (i == 1){
                    this.pos = i;
                    this.placeShips(player, player.ships[i].BUQUE, playerGrid)
                    
                }
                else if (i == 2 || i == 3){
                    this.pos = i;
                    this.placeShips(player, player.ships[i].SUBMARINO, playerGrid)
                }
                else if (i == 4 || i == 5 || i == 6){
                    this.pos = i;
                    this.placeShips(player, player.ships[i].CRUCERO, playerGrid)
                }
                else {
                    this.pos = i;
                    this.placeShips(player, player.ships[i].LANCHA, playerGrid)
                }
            }
        },
        //Colocar los barcos de los jugadores
        //player.positions[this.pos].push(Object.assign([], this.array))
        //
        randomCoords(barco, gridSize){
            let x1 = random(0, gridSize - barco.life);      //Obtengo un número aleatorio para el espacio máximo en el que puede colocarse este barco.
            let y1 = Math.floor(Math.random() * gridSize);
            let array = [x1, y1]
            return array
        },

        freeSpace(player, barco, coords, gridSize, playerGrid, find){           
            for(let i = 0; i < 10; i++){
                find = player.positions[i].findIndex(element => element[0] === coords[0] && element[1] === coords[1]);
                if (find !=-1 && coords[0] > 0 && coords[0] < gridSize - barco.life){
                    break
                }
            }
            return find
        },
        
        testCoords(player, barco, coords, gridSize, playerGrid, find, a){
            let array = [coords[0],coords[1]];
            if (a == 'Par'){
                for(let j = 0; j < barco.life; j++){
                    if (array[0] > gridSize - 1 || playerGrid[array[1]][array[0]] != EMPTY){
                        find = 0
                        break
                    }
                    ++array[0]
                }  
            }
            else{
                for(let j = 0; j < barco.life; j++){
                    if (array[1] > gridSize - 1 || playerGrid[array[1]][array[0]] != EMPTY){
                        find = 0
                        break
                    }
                    ++array[1]
                }
            }
            return find 
        },
        push(player, coords, array){
            console.log(coords);
            switch(this.pos) {
                case this.pos = 1:
                    player.ships[1].BUQUE.position.push(Object.assign([], array));
                    break;
                case this.pos = 2:
                    player.ships[2].SUBMARINO.position.push(Object.assign([], array));
                    break;
                case this.pos = 3:
                    player.ships[3].SUBMARINO.position.push(Object.assign([], array));
                    break;
                case this.pos = 4:
                    player.ships[4].CRUCERO.position.push(Object.assign([], array));
                    break;
                case this.pos = 5:
                    player.ships[5].CRUCERO.position.push(Object.assign([], array));
                    break;
                case this.pos = 6:
                    player.ships[6].CRUCERO.position.push(Object.assign([], array));
                    break;
                case this.pos = 7:
                    player.ships[7].LANCHA.position.push(Object.assign([], array));
                    break;
                case this.pos = 8:
                    player.ships[8].LANCHA.position.push(Object.assign([], array));
                    break;
                case this.pos = 9:
                    player.ships[9].LANCHA.position.push(Object.assign([], array));
                    break;
                default :
                    player.ships[0].PORTAAVIONES.position.push(Object.assign([], array));        
            }
        },

        place(player, barco, coords, gridSize, playerGrid, a){
            let array = [];
            console.log(array)
            for (let i = 0; i < barco.life; i++){
                playerGrid[coords[1]][coords[0]] = barco.figure;
                //player.positions[this.pos].push(Object.assign([], coords))
                array.push(Object.assign([], coords))
                if (a == 'Par'){
                    ++coords[0]
                }
                else {
                    ++coords[1]
                }  
            }
            this.push(player, coords, array) 

        },

        placeShips(player, barco, playerGrid){
            let find = '';
            let coords = '';
            let a = random(0, gridSize)
            if (a % 2 == 0) {
                a = 'Par'  
            }
            else{
                a = 'Impar'
            }
            do {
                coords = this.randomCoords(barco, gridSize) //Me devuelve array de coordenadas          
                find = this.freeSpace(player, barco, coords, gridSize, playerGrid, find) //Devuelve si está libre o no esa coordenada
                find = this.testCoords(player, barco, coords, gridSize, playerGrid, find, a) // Devuelve si se puede colocar el barco ahí o no.
            }
            while (find != -1 && coords[0] <= gridSize - barco.life)
            this.place(player, barco, coords, gridSize, playerGrid, a)                         
        },
    },
    
    
    toDecide(){
        let who = this.totalShoots;
        if(who % 2 == 0){
            this.shooter = playerA
            this.enemy = playerB
        }
        else{
            this.shooter = playerB
            this.enemy  = playerA  
        }
        return this.shooter, this.enemy
    },
    
    toShoot(shooter){
        let x = random(0, gridSize-1);
        let y = random(0, gridSize-1);
        let shooterShootCoord = [x, y];
        shooter.shootCoord = shooterShootCoord //Asigno el disparo a la propiedad shootCoord del jugador que dipara
    },

    toTestLog(shooter, shootCoord, find){     
        find = shooter.shootsLog.findIndex(elemento => {elemento[0] === shootCoord[0] && elemento[1] === shootCoord[1]})
        return find
    },
    
    toLog(shooter, shootCoord){    //Añadimos el disapro al registro de diparos de cada jugador
        shooter.shootsLog.push(Object.assign([], shootCoord))
        shooter.shoots++
    },
    
    toSeeEnemyGrid(shooter, enemy, figurin){        
        if (enemy.grid[shooter.shootCoord[1]][shooter.shootCoord[0]] != EMPTY){
            enemy.grid[shooter.shootCoord[1]][shooter.shootCoord[0]] = FIGURES[1]
            enemy.life--
            this.figurin = '🔥'
        }
        else {
            enemy.grid[shooter.shootCoord[1]][shooter.shootCoord[0]] = FIGURES[0]
            this.figurin = '💧'
        }   
        return this.figurin
    },

    TestLife(enemy, dead){
        if (this.enemy.life == 0){
            this.dead = true
        }
        else{
            this.dead = false
        }
        return this.dead
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
    
    round(shooter, enemy, countRound) {
        let find = 'Soy find';
        printLine(`Ronda ${countRound} for ${shooter.name}`)
        do {this.toShoot(shooter)
            find = this.toTestLog(shooter, shooter.shootCoord, find)    //Compruebo si se ha realizado el disparo        
        }
        while (find != -1)
        this.toLog(shooter, shooter.shootCoord)
    },
    
    start(){
        let shooter = '';
        let enemy = '';
        let dead = false;
        let countRound = 0;
        let figurin = '';

        while (dead == false && this.totalShoots < 10){
            this.toDecide()
            this.round(this.shooter, this.enemy, countRound)
            figurin = this.toSeeEnemyGrid(this.shooter, this.enemy, this.figurin)             // Miro el disparo en el tablero del enemigo
            console.log(`Shoot #${this.shooter.shoots} pointing to ${this.shooter.shootCoord[1]}${String.fromCharCode(this.shooter.shootCoord[0] + 65)}: ${figurin}`)
            console.log()
            printLine('Own board')
            print_Grid(this.shooter.grid)
            
            console.log()
            printLine('Enemy board')
            print_Grid(this.enemy.grid, true)
            dead = this.TestLife(this.enemy, this.dead)
            console.log(`La vida de ${this.shooter.name} es de ${this.shooter.life}`)
            console.log(`La vida de ${this.enemy.name} es de ${this.enemy.life}`)
            this.totalShoots++
            countRound++
        }
    },

    toWin(){
        switch (this.totalShoots <= 200){
            case playerA.life > playerB.life :
                return playerA.name;
                break;
            case playerA.life < playerB.life :
                return playerB.name;
                break;
            default :
                return "Sorry, there isn't any winner. Try again."
            }
    }
    
}

function random(min, max) {                     
    return Math.floor((Math.random() * (max - min + 1)) + min)
}