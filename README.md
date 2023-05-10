# JavaScript

# HUNDIR LA FLOTA - SIMULACIÓN


En esta simulación se lleva a cabo una partida aleatoria a este juego en la que se enfrentan los jugadores Player A y Player B.

Se crea un tablero de 10x10 mediante un array bidimensdional y en él se distribuyen los 10 barcos de la flota de cada jugador. Cada jugador constará de dos tableros, el suyo propio, y un en blanco del enemigo. Los barcos de que consta cada jugador son:

* 1 portaaviones (5 casillas)
* 1 buque (4 casillas)
* 2 submarinos (3 casillas)
* 3 cruceros (2 casillas)
* 3 lanchas (1 casilla)

## Mecánica del juego:

* Se asignan barcos de forma aleatoria para el tablero propio de cada jugador.
* El juego es juego por turnos, empezando por el primer jugador, también de forma aleatoria. En cada turno, el jugador realiza un disparo:
    * en caso de acertar, se sigue disparando.
    * en caso de no acertar, se pasa al turno al otro jugador.
* el juego termina cuando todos los barcos de algún jugador hayan sido hundidos.

El juego comienza mostrando un texto a modo de título informativo, continua con un ciclo do-while en el que ......

## Ejecución

```
node index.js
```

## Estructura de archivos //Revisar

El archivo principal es `index.js`, que es el que iniciamos y muestra el que lleva el orden del juego.
El juego como tal está en `game.js`. Este juego `game.js` tiene a su vez 2 jugadores, que se sirven de `player.js`. Estos jugadores a su vez tienen 2 tableros `board.js`. Además contamos con funciones auxiliares en la carpeta `/utils` (`functions.js` y `printer.js`). También usamos la carpeta `/data` para almacenar constantes de configuración, como `settings.js` o `ships.js`

Finalmente la capa de presentación la delegamos a `showGame.js` que nos permite mostrar la ejecución de la simulación.

### index.js
MIRAR
Archivo principal que carga la dependencia del juego (`game.js`) y del visualizador del juego (`showGame.js`). 

### game.js
MIRAR
Archivo que contiene la lógica del desarrollo del juego. Exporta un objeto que contiene el array de jugadores, los barcos disponibles, las rondas, el ganador, y los métodos principales `setupGame` y `start`

* **setupGame** Se encarga de generar los jugadores. Se apoya en `player.js`, `utils.js`
* **start** Se encarga de la mecánica del juego. Hace la alternancia entre jugadores, registra en un array los disparos para poder reproducir el juego. Necesita de un prámetro "shootsNumber" para definir el total de disparos de la partida.
* **updatePlayersBoards** Se encarga de escribir en los tableros correspondientes el resultado del disparo
* **registerShoot** Sirve para registrar el disparo
* **isShipDrawn** Nos ayuda a comprobar si un barco está hundido, para luego poder mostrar por pantalla "y hundido"
* **stillShootsRemaining** Método informativo que indica si algún jugador tiene aún disparos disponibles
* **resolveDraw** Deshace el empate en caso de que las naves a flote de cada jugador sean diferentes

LOS MÍOS



**placeShips** Dibuja los barcos de cada jugador en el tablero de juego. Se apoya en las siguientes funciones:
* **ramdonCoords** Devuelve una coordenada aleatoria del tablero.
* **testCoord** Comprueba que la coordenada otenida en ramdonCoords, donde será colocado el barco, está libre.
* **place** Dibuja el barco en el tablero de cada jugador.

### player.js

Módulo que nos exporta una única función y ésta se encara de devolvernos un nuevo jugador. Las propiedades de este nuevo jugador son: identificadores (nombre); tableros (propio y contrario); contadores (disparos hechos, celdas de barcos enemigos); barcos propios y celdas disponibles (todas las celdas disponibles y las priorizadas). Los métodos son:

* **setupPlayer** Necesita un parámetro de barcos disponibles para colocarlos en el tablero. La colocación la delega a una función de `board.js`. Inicializa también variables en función de los barcos disponibles.
* **getEnemyCoordinate** Acepta un modo de juego, de forma que si no se quiere que sea inteligente, devuelve una coordenada al azar, sino devuelve una coordenada enemiga priorizando mirar primero en la propiedad de posibles candidatos y si no los hay, entonces devolver una coordenada al azar. Se incrementa el número de disparos también
* **updateBoardCell** Actualiza la celda de un tablero y si es el tablero enemigo entonces actualiza el listado de las celdas candidatas 
* **getCellStatus** Devuelve el estado de una casilla de un tablero
* **generateCandidates** Devolverá un listado de casillas disponibles según el disparo hecho, siendo las posibilidades de partida norte, sur, este, oeste de la casilla en cuestión. Posteriormente se filtra para asegurarnos que esa casilla está vacía según el tablero enemigo
* **updateEnemyBoardCandidateCells** A partir de una coordenada, se generan unos candidatos. De esos candidatos, se añaden aquellos que aún no existen en el array de celdas candidatas a ser disparadas.

### board.js
MIRAR
Módulo para gestionar los tableros. Exporta 2 funciones a pesar de tener más de 2 (son de carácter interno y por eso no son exportadas).

* **generateBoard** Genera un tablero que en este caso es un Array 2D
* **placeShipsOnBoard** Coloca un listado de barcos en un tablero e informa de dónde han sido colocados (via playerShips)
* *_placeShipOnBoard_* Coloca un barco en un tablero y devuelve las coordenadas. En un bucle infinito, genera las coordenadas, luego comprueba si todas las celdas que ocuparía ese barco están disponibles y si no lo están permanece en el bucle, mientras que si están disponibles, entonces coloca el barco y sale del bucle.
* *_canBePlaced_* Comprueba si todas las celdas donde colocar el barco están vacías, respetando los bordes del tablero. Un barco se puede colocar en una coordenada si desde esa coordenada, hasta x casillas, determinadas por el barco (en sentido vertical u horizontal)
* *_registerShipOnBoard_* Modifica las celdas del tablero según el barco y las coordenadas
* *_getMaximumsColAndRow_* Función auxiliar que devuelve los límites al comprobar si un barco cabe o no en el tablero.

### showGame.js
MOSTRAR
Módulo que exporta una única función que es la responsable de mostrar la ejecución del juego. Se apoya en `utils/printer.js` para mostrar por consola los resultados.

Muestra primero los jugadores y sus barcos, luego recorre el registro de rondas y finalmente muestra el jugador vencedor, a la vez que saca también los tableros al final de la partida.

### utils/printer.js

Módulo auxiliar que agrupa los mensajes en console.* según si son de tablero (console.table), o si son mensajes de linea (console.log)

### utils/functions.js

Módulo auxiliar para generar números aleatorios, sacar un elemento de un array de forma aleatoria o convertir de número a letra para las coordenadas, así como convertir de un número a una coordenada o de coordenada a número.

### data/ships.js

Módulo que contiene los diferentes barcos

### data/settings.js

Módulo de configuración con dimensiones del tablero, casillas, número de jugadores, barcos disponibles...
