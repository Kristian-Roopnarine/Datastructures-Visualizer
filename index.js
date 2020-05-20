let newArrayButton = document.getElementById('new-array-button')
let arraySpace = document.getElementById('array-space')
let ARRAY_SIZE = 10



function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createNewArray(){
    const arr = []
    for (var i=0;i<ARRAY_SIZE;i++){
        arr.push(randomIntFromInterval(1,25))
    }
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
        newDiv.className='col animate__animated animate__fadeInDown'
        newDiv.appendChild(document.createTextNode(element))
        arraySpace.appendChild(newDiv)
    });
    
}

function clicked(){
    arr = createNewArray()
    renderArray(arr)
}

function createArrows(){
    // find middle right position of element

    // find middle left position of next element

    // draw svg between the two
}

newArrayButton.addEventListener('click',clicked)