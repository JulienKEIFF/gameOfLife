let ui = document.getElementById('config')
let stateUi = false

function uiChanger(){
  if(stateUi === false){
    ui.style.height = '15px'
    stateUi = !stateUi
  }else{
    ui.style.height = '92%'
    stateUi = !stateUi
  }
}