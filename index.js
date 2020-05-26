let RIGHT_ARROW_PATH = './right-arrow.svg'
let linkedListSpace = document.getElementById('linked-list-space')
let newLinkedList = document.getElementById('new-linked-list')
let newLLNode = document.getElementById('new-node')
let LLMethods = document.getElementById('linked-list-methods')
let findNodeValue = document.getElementById('find-linked-list')
let feedbackDiv = document.getElementById('feedback')

newLinkedList.addEventListener('click',createLinkedList)
newLLNode.addEventListener('click',addNode)
findNodeValue.addEventListener('click',findNode)

function resetNodes(){
    feedbackDiv.innerHTML= ""
    let linkedListNodes = document.querySelectorAll('.col-2')
    linkedListNodes.forEach(node=>{
        node.firstChild.classList.remove('bg-success')
    })
}

function findNode(){
    resetNodes()
    let nodeValueInput = parseInt(document.getElementById('node-integer-value').value)
    let position = LL.find(nodeValueInput)
    console.log(position)
    
    if (position){
        let linkedListNodes = document.querySelectorAll('.col-2')
        linkedListNodes[position-1].firstChild.classList.add('bg-success')
        feedbackDiv.innerHTML = `<h2 class="text-center">Found a Node with the value of ${nodeValueInput} at position ${position}</h2>`
    } else (
        feedbackDiv.innerHTML = `<h2 class="text-center">Could not find a Node with the value ${nodeValueInput}</h2>`
    )
    
}

function createLinkedList(){
    LL = new LinkedList()
    linkedListSpace.innerHTML = "<h2 class='text-center'>Linked List initialized. You can now add Nodes to your Linked List.</h2>"
}

function updateRoot(){
    for(var i=0;i < linkedListSpace.childNodes.length;i++){
        i===0 ? linkedListSpace.childNodes[i].style.textDecoration="underline": linkedListSpace.childNodes[i].style.textDecoration="none"
    }
}


function addNode(){

    //LLMethods.style.display='block'
    LLMethods.classList.add('animate__animated','animate__fadeIn')
    let nodeToAdd = new Node(createNodes())
    LL.add(nodeToAdd)

    if (LL.size === 0){
        linkedListSpace.innerHTML = ""
    } else {
        arrowDiv = createArrows()
        linkedListSpace.insertBefore(arrowDiv,linkedListSpace.childNodes[0])
    }

    var newDiv = document.createElement('div')
    newDiv.id = `${LL.size}-${nodeToAdd.value.value}`
    newDiv.className = 'col-2 text-center animate__animated animate__fadeInDown mt-3'
    newDiv.innerHTML = `<div class="card"><h3 class="card-header">Node</h3><div class="card-body"><h4><span class="align-middle">Value: ${nodeToAdd.value.value}</span></h4></div></div>`
    newDiv.style.width = "4rem"
    linkedListSpace.insertBefore(newDiv,linkedListSpace.childNodes[0])

    updateRoot()
    
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


function clicked(){
    arr = createNewArray()
    renderArray(arr)
}

function createArrows(){
    var arrowDiv = document.createElement('div')
    arrowDiv.className= "col-1 animate__animated animate__fadeInDown d-flex align-items-center"
    arrowDiv.innerHTML = `<img class="mx-auto" src=${RIGHT_ARROW_PATH} height="25px" />`
    return arrowDiv
}

