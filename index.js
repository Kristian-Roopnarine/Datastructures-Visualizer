let newArrayButton = document.getElementById('new-array-button')
let arraySpace = document.getElementById('array-space')
let ARRAY_SIZE = 10

function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createNewArray(){
    const arr = []
    for (var i=0;i<ARRAY_SIZE;i++){
        arr.push(randomIntFromInterval(5,25))
    }
    return arr
}

function renderArray(arr){
    arraySpace.textContent = arr
}


function clicked(){
    arr = createNewArray()
    renderArray(arr)
}

newArrayButton.addEventListener('click',clicked)