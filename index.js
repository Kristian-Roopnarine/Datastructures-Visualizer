let newArrayButton = document.getElementById('new-array-button')
let arraySpace = document.getElementById('array-space')
let ARRAY_SIZE = 8
let RIGHT_ARROW_PATH = './right-arrow.svg'


function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createNewArray(){
    const arr = []
    for (var i=0;i<ARRAY_SIZE;i++){
        arr.push(randomIntFromInterval(1,25))
    }
    arr.push(null)
    return arr
}

function renderArray(arr){

    // removes previous nodes if they exist
    if (arraySpace.firstChild) {
        while (arraySpace.firstChild) arraySpace.removeChild(arraySpace.firstChild)
    }

    //creates new nodes
    arr.forEach(element=>{
        var newDiv = document.createElement('div')
        newDiv.className='col-1 text-center animate__animated animate__fadeInDown'
        newDiv.innerHTML = `<h1><span class="align-middle">${element}</span></h1>`
        arraySpace.appendChild(newDiv)
        //newDiv.appendChild(document.createTextNode(element))
        if (element != null){
            arrowDiv = createArrows()
            arraySpace.appendChild(arrowDiv)  
        }
    });
    
}

function clicked(){
    arr = createNewArray()
    renderArray(arr)
}

function createArrows(){
    var arrowDiv = document.createElement('div')
    arrowDiv.className="col animate__animated animate__fadeInDown d-flex align-items-center"
    arrowDiv.innerHTML = `<img class="mx-auto" src=${RIGHT_ARROW_PATH} height="25px" />`
    return arrowDiv
}

newArrayButton.addEventListener('click',clicked)