function verticalDraw (barco, array){
    let totalCoords = [[...array]]
    let newCoords
    for (let j = 0; j < barco; j++) {
        newCoords = [array[0], (array[1] = ++array[1])];
        totalCoords.push(newCoords)
    }
    return totalCoords
}

let barco = 5
let array = [0,0]
console.log(verticalDraw (barco, array))