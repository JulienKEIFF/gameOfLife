// setup control elements //
let startButton = document.getElementById('start')
let displaySetting = document.getElementById('setting')
let screen = document.getElementById('screen')

const heightInput = document.getElementById('height-input').value
const widthInput = document.getElementById('width-input').value
const cellSizeInput = document.getElementById('cell-size-input').value

// Setup the grid //
const cellSize = cellSizeInput ? cellSizeInput : 20
const screenHeight = heightInput ? heightInput : 300
const screenWidth = widthInput ? widthInput : 300
const heightInCell = screenHeight/cellSize
const widthInCell = screenWidth/cellSize
let screenInBlock = []

// Setup system elements //
let gridCreated = false
let cellArray = []
let delay = 100
let choiceDone = false

initScreen()

// Function system //
function initScreen(){ // Create grid //
  if(gridCreated){
    alert('Grille déja créer')
    return
  }else{
    for (let i = 0; i < heightInCell - 1; i++) {
      let index = i
      screenInBlock.push([0, i])
      for (let i2 = 1; i2 < widthInCell - 1; i2++) {
        screenInBlock.push([i2, index])
      }
    }
    screenInBlock.forEach(el => {
      newCell = new cell(el, false)
      newCell.display()
      cellArray.push(newCell)
    });
    //console.log(cellArray)
    gridCreated = !gridCreated
  }
}

function turn(){  
  cellArray.forEach(cellRef => {
    //console.log(cellRef.position)
    let countLife = 0
    let neightbor = []

    for (let i = 0; i < cellArray.length; i++) {
      if(cellRef.position[0] === cellArray[i].position[0]+1 && cellRef.position[1] === cellArray[i].position[1]){
        neightbor.push(cellArray[i]) // E
      }else if(cellRef.position[0] === cellArray[i].position[0]-1 && cellRef.position[1] === cellArray[i].position[1]){
        neightbor.push(cellArray[i]) // D
      }else if(cellRef.position[1] === cellArray[i].position[1]+1 && cellRef.position[0] === cellArray[i].position[0]){
        neightbor.push(cellArray[i]) // G
      }else if(cellRef.position[1] === cellArray[i].position[1]-1 && cellRef.position[0] === cellArray[i].position[0]){
        neightbor.push(cellArray[i]) // B
      }else if(cellRef.position[0] === cellArray[i].position[0]-1 && cellRef.position[1] === cellArray[i].position[1]-1){
        neightbor.push(cellArray[i]) // A
      }else if(cellRef.position[0] === cellArray[i].position[0]+1 && cellRef.position[1] === cellArray[i].position[1]-1){
        neightbor.push(cellArray[i]) // C
      }else if(cellRef.position[0] === cellArray[i].position[0]+1 && cellRef.position[1] === cellArray[i].position[1]+1){
        neightbor.push(cellArray[i]) // H
      }else if(cellRef.position[0] === cellArray[i].position[0]-1 && cellRef.position[1] === cellArray[i].position[1]+1){
        neightbor.push(cellArray[i]) // F
      }
    }

    for (let i = 0; i < neightbor.length; i++) {
      let stateExtract = neightbor[i].state
      if(stateExtract === true){
        cellRef.countLife++
      }
    }
    if (cellRef.countLife === 3 && cellRef.state === false) {
      cellRef.nextState = true
    }else if(cellRef.countLife === 2 && cellRef.state === true || cellRef.countLife === 3 && cellRef.state === true){
      cellRef.nextState = true
    }else {
      cellRef.nextState = false
    }
  });

  cellArray.forEach(cellRef => {
    //console.log(cellRef.nextState + ' ' + cellRef.position)
    if (cellRef.countLife === 3 && cellRef.nextState === true) {
      cellRef.state = true
      cellRef.nextState = false
      cellRef.countLife = 0
      cellRef.refresh()
    }else if(cellRef.countLife === 2 && cellRef.nextState === true || cellRef.countLife === 3 && cellRef.nextState === true){
      cellRef.state = true
      cellRef.nextState = false
      cellRef.countLife = 0
      cellRef.refresh()
    }else {
      cellRef.state = false
      cellRef.nextState = false
      cellRef.countLife = 0
      cellRef.refresh()
    }
  });

  setTimeout(turn, delay) 
}

// List of constructor function //
function cell(position){
  this.object
  this.countLife = 0
  this.position = position
  this.position = []
  this.state = false
  this.nextState = false
  this.display = function(){
    let div = document.createElement('div')
    div.style.width = cellSize + 'px'
    div.style.height = cellSize + 'px'
    div.style.border = '1px solid'
    div.style.boxSizing = 'border-box'
    div.style.position = 'absolute'
    div.className = 'cell'
    screen.appendChild(div)
    let X = position[0] * cellSize
    let Y = position[1] * cellSize
    this.position = [position[0], position[1]]
    div.style.left = X + 'px'
    div.style.top = Y + 'px'
    this.object = div
  }
  this.refresh = function(){
    if(this.state){//true = life | false = dead //
      this.object.style.backgroundColor = 'black'
    }else{
      this.object.style.backgroundColor = 'white'
    }
  }
}

// Click Action //
addEventListener('click', event => {
  let divClicked = event.target
  let objectFind = cellArray.find(cell => cell.object === divClicked)
  objectFind.state = !objectFind.state
  objectFind.refresh()
})


// GRID //

/*
    _________________
    | A  | B  |  C  |
    _________________
    | D  | O  |  E  |
    __________________
    | F  | G  |  H  |
    __________________

*/