// setup control elements //
let startButton = document.getElementById('start')
let displaySetting = document.getElementById('setting')
let screen = document.getElementById('screen')

const heightInput = document.getElementById('height-input').value
const widthInput = document.getElementById('width-input').value
const cellSizeInput = document.getElementById('cell-size-input').value

// Setup the grid //
const cellSize = cellSizeInput ? cellSizeInput : 15
const screenHeight = heightInput ? heightInput : 600
const screenWidth = widthInput ? widthInput : 600
const heightInCell = screenHeight/cellSize
const widthInCell = screenWidth/cellSize
let screenInBlock = []

// Setup system elements //
let gridCreated = false

// Function system //
function initScreen(){
  if(gridCreated){
    alert('Grille déja créer')
    return
  }else{
    for (let i = 1; i <= heightInCell; i++) {
      let index = i
      screenInBlock.push([1, i])
      for (let i2 = 2; i2 <= widthInCell; i2++) {
        screenInBlock.push([i2, index])
      }
    }
    screenInBlock.forEach(el => {
      newCell = new cell(el, false)
      newCell.display()
    });
    console.log(screenInBlock)
    gridCreated = !gridCreated
  }
}

function launchSim(){
  if(gridCreated){
    console.log('go')
  }else{
    alert('Creer une grille')
  }
  
}

// List of constructor function //
function cell(position, state){
  this.state = state //true = life | false = dead //
  this.display = function(){
    let div = document.createElement('div')
    div.style.width = cellSize + 'px'
    div.style.height = cellSize + 'px'
    div.style.border = '1px solid'
    div.style.boxSizing = 'border-box'
    div.style.position = 'absolute'
    if(state){
      div.style.backgroundColor = 'black'
    }else{
      div.style.backgroundColor = 'white'
    }
    screen.appendChild(div)
    console.log('created')
    let X = position[0] * cellSize
    let Y = position[1] * cellSize
    div.style.left = X + 'px'
    div.style.top = Y + 'px'
  }
}

// On click //
