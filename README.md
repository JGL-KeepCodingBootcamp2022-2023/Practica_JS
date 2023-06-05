# Práctica del Módulo de introducción a JavaScript.

# HUNDIR LA FLOTA - SIMULACIÓN

Battleship es un juego clásico de hundir la flota, donde dos jugadores se enfrentan en un tablero con barcos ocultos. El objetivo es adivinar las posiciones de los barcos del oponente y hundirlos antes de que él hunda los tuyos.

En esta simulación se lleva a cabo una partida aleatoria a este juego en la que se enfrentan los jugadores Player A y Player B.

Este script de javascript te permite jugar a battleship en la terminal usando node. Puedes elegir el número de disparos que tienes por jugador.

Se crea un tablero de 10x10 mediante un array bidimensdional y en él se distribuyen los 10 barcos de la flota de cada jugador. Cada jugador constará de dos tableros, el suyo propio, y uno en blanco del enemigo. Los barcos de que consta cada jugador son:

* 1 portaaviones (5 casillas)
* 1 buque (4 casillas)
* 2 submarinos (3 casillas por submarino)
* 3 cruceros (2 casillas por crucero)
* 3 lanchas (1 casilla por lancha)

## Mecánica del juego:

* Se asignan barcos de forma aleatoria para el tablero propio de cada jugador.
* El juego es juego por turnos, empezando por el Player A. En cada turno, el jugador realiza un disparo:
    * en caso de acertar, el jugador sigue disparando.
    * en caso de no acertar, se pasa al turno al otro jugador.
* el juego termina cuando todos los barcos de algún jugador hayan sido hundidos.

## Ejecución

Para iniciar el script, necesitas tener instalado node en tu ordenador. Luego, abre la terminal y navega hasta la carpeta donde está el script. Ejecuta el siguiente comando:

```
node index.js
```

El script iniciará el juego, mostrará el tablero cada jugador e iniciará las rondas para cada jugador, comenzando por el Player A. El juego termina cuando uno de los jugadores hunde todos los barcos del otro.

## Estructura de archivos

El archivo principal es `index.js`, que es el que iniciamos y muestra el que lleva el orden del juego.
El juego como tal está en el archivo `game.js`. Este juego `game.js` tiene a su vez 2 jugadores, que se sirven de `data.js`. Estos jugadores a su vez tienen 2 tableros, `board.js`. Además, contamos con funciones auxiliares en la carpeta `/utils` (`indexFunctions.js`, `utils.js` y `printer.js`).

### index.js

Archivo principal que carga las dependencias del juego (`game.js`), los datos de los jugadores y del resto de funciones .

Se podrán definir los disparos a realizar para cada jugador en la línea 19, en la función `theGame()`.

Cuando termine el juego, llama la función `toWin()` para decidir quién es el ganador.
Con `showResults()` muestra los dos tableros de los jugadores con los resultados de la batalla.

### game.js

Archivo que contiene la lógica del desarrollo del juego. Exporta un objeto que contiene el array de jugadores, los barcos disponibles, las rondas, el ganador, y los métodos principales `setupGame` y `start`

* **setupGame** Se encarga de generar los jugadores. Se apoya en `data.js`, `board.js` y `utils.js`. Registra las coordenadas de cada barco.
    **shipsToPlayers** Añade los barcos basándose en la clase a cada jugador.
    **playerShips** Coloca los barcos de cada jugador y almacena sus posiciones con la función placeShips.
    **placeShips** Dibuja los barcos de cada jugador en el tablero de juego. Se apoya en las siguientes funciones:
        **place** Dibuja el barco en el tablero de cada jugador.
        **ramdonCoords** Devuelve una coordenada aleatoria del tablero.
        **testCoord** Comprueba que la coordenada otenida en ramdonCoords, donde será colocado el barco, está libre. Llamará a jorozontalDraw o verticalDraw segúnel resultado de paridad.
        **paridad** Decide si el barco irá en posición horizontal o vertical.
        **freeSpace** Comprueba que no existen posiciones guardadas en el registro de posiciones de barcos del jugador.
        **passValue** Devuelve pass para determinar si pasa o no el test pass para colocar el barco.
        **horizontal / horizontalDraw** Se encargan de gestionar la ubicación horizontal del barco, dibujarlo y añadir las posicoines del mismo al registro de posiciones de los barcos.
        **varical / verticalDraw** Se encargan de gestionar la ubicación vertical del barco, dibujarlo y añadir las posicoines del mismo al registro de posiciones de los barcos.


* **start** Se apoya en `data.js`, `board.js` y `utils.js` principalmente, aunque también usa `printers.js` para los textos de título. Se encarga de iniciar la mecánica del juego. Muestra los textos iniciales de partida y controla la supervivencia de cada jugador:
    * **paying** Controla la mecánica de cada ronda. Llama a `toPlay()` para realizar un disparo de un jugador para luego llamar a `toDecide()` para cambiar de jugador y que éste juegue.
    * **toPlay** Llamando a la función de `playerRound()` y controlando la presentación de datos en pantalla tras las rondas de cada jugador.
    * **playerRound** Controla cada ronda del jugador devolviendo si el contrario ha sobrevivido al disparo y repitiendo el disparo si éste ha impactado.
    * **toShoot** Obtiene un valor aleatori para x e y y los guarda en un array [x, y], que es la coordenada del diparo de la variable shootCoord.
    * **toTestLog** Comprueba que el disparo no se ha relizado anteriormente devolviendo el valor de la variable find.
    * **toSeeEnemyGrid** "Mira" en el tablero enemigo. Si en la coordenada shootCoord (recibida como parámetro) la casilla está vacía, dibuja "agua" y si contiene un barco, dibuja "tocado".
    * **showShootResults** Se encarga de escribir en los tableros correspondientes el resultado del disparo.
    * **manageResults** Maneja el resultado del disparo.
    * **touchedAndSunk** Muestra un mensaje indicando el nombre del barco que ha sido impactado y hundido.
    * **toDecide** Cambia la función de cada jugador si su turno ha terminado, pasando éste de "shooter" a "enemy" y viceversa.


### data.js

Módulo con las clases PLAYER y TYPESHIP que nos exporta los jugadores y los tipos de barcos respectivamente. Las propiedades de los jugadores son: nombre, tablero, vida, disparos hechos, coordenada del disparo, coordenadas de todos los diparos y barcos hundidos.
Tambiñen exporta un array con los tipos de resultado tras un disparo, "gua" y "tocado".

### board.js

Módulo para gestionar los tableros. También exporta la "casilla vacía" y el tamaño del tablero.

* **create_Grid** Genera un tablero que en este caso es un Array 2D, segun el valor de la variable gridSize.

### utils/printer.js

Módulo auxiliar muestra los textos y tableros en pantalla:
    **printHeading** Imprime en pantalla los títilos de juego.
    **printLine** Imprime una línea.
    **print_Grid** Dibuja el tablero de cada jugador en función de si es el shooter (lo muestra completo) o si es enemy (muestra sólo el resultado de los disparos).
    **create_Headers** Función que genera las cabeceras de las columnas y transforma los números en letras.

### utils/indexFunctions.js

Exporta las funciones setUpGame y theGame que emplea el módulo principal index.js.


### utils/utils.js

Módulo auxiliar para generar los títulos, números aleatorios, ver si un jugador ha sobrevivido al disparo, mostrar al ganador y mostrar los tableros finales tras la batalla.