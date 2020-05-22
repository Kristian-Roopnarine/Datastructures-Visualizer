let newArrayButton = document.getElementById('new-array-button')
let arraySpace = document.getElementById('array-space')
let ARRAY_SIZE = 8
let RIGHT_ARROW_PATH = './right-arrow.svg'
let linkedListSpace = document.getElementById('linked-list-space')
let newLinkedList = document.getElementById('new-linked-list')
let newLLNode = document.getElementById('new-node')

newArrayButton.addEventListener('click',clicked)
newLinkedList.addEventListener('click',renderLinkedList)
newLLNode.addEventListener('click',addNode)


function renderLinkedList(){
    LL = new LinkedList()
}

function addNode(){
    let nodeToAdd = new Node(createNodes())
    LL.add(nodeToAdd)
    if (LL.size > 0){
        arrowDiv = createArrows()
        linkedListSpace.insertBefore(arrowDiv,linkedListSpace.childNodes[0])  
    }
    var newDiv = document.createElement('div')
    newDiv.id = `${LL.size}-${nodeToAdd.value.value}`
    newDiv.className = 'col-1 text-center animate__animated animate__fadeInDown'
    newDiv.innerHTML = `<h1><span class="align-middle">${nodeToAdd.value.value}</span></h1>`
    linkedListSpace.insertBefore(newDiv,linkedListSpace.childNodes[0])
    
    LL.printValues()
}

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
    arrowDiv.className="col-1 animate__animated animate__fadeInDown d-flex align-items-center"
    arrowDiv.innerHTML = `<img class="mx-auto" src=${RIGHT_ARROW_PATH} height="25px" />`
    return arrowDiv
}

