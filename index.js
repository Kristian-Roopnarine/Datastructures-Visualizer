let RIGHT_ARROW_PATH = './right-arrow.svg'
let linkedListSpace = document.getElementById('linked-list-space')
let newLinkedList = document.getElementById('new-linked-list')
let newLLNode = document.getElementById('new-node')
let LLMethods = document.getElementById('linked-list-methods')
let findNodeValue = document.getElementById('find-linked-list')
let feedbackDiv = document.getElementById('feedback')
let deleteLLNode = document.getElementById('delete-linked-list-node')
let initializedLL = false

newLinkedList.addEventListener('click',createLinkedList)
newLLNode.addEventListener('click',addNode)
findNodeValue.addEventListener('click',animateFindNodes)
deleteLLNode.addEventListener('click',deleteNode)



function animateFindNodes(){
    // get position
    resetNodes()
    let nodeValueInput = parseInt(document.getElementById('node-integer-value').value)
    let position = LL.find(nodeValueInput)
    if(position){
        feedbackDiv.innerHTML = `<h2 class="text-center">Searching for a Node with a value of ${nodeValueInput}.</h2>`
        let linkedListNodes = document.querySelectorAll('.col-2')
        for(var i = 0 ; i < position - 1 ;i++){
            doSetTimeout(i,linkedListNodes)
        }
        setTimeout(()=>{
            linkedListNodes[position-1].firstChild.classList.add('bg-success')
            feedbackDiv.innerHTML = `<h2 class="text-center">Found a Node with the value of ${nodeValueInput} at position ${position}</h2>`
        },250*position-2)
    } else {
        feedbackDiv.innerHTML = `<h2 class="text-center">Did not find a Node with the value of ${nodeValueInput}.</h2>`
    }
    // iterate over the nodes array

}

function doSetTimeout(i,array){
    setTimeout(()=>{
        array[i].firstChild.classList.add('bg-danger')
        setTimeout(()=>{
            array[i].firstChild.classList.remove('bg-danger')
        },270)
    },250*i)
    
    
}

function deleteNode(){
    let nodeValueInput = parseInt(document.getElementById('node-integer-value').value)
    let position = LL.delete(nodeValueInput)
    LL.printValues()

    if(position){

        let linkedListNodes = document.querySelectorAll('.col-2')
        let arrowDiv = document.querySelectorAll('.arrow')
        linkedListNodes[position-1].classList.remove('animate__fadeInDown')
        linkedListNodes[position-1].classList.add('animate__fadeOut')

        setTimeout(()=>{
            linkedListSpace.removeChild(linkedListNodes[position-1])
            linkedListSpace.removeChild(arrowDiv[position-1])
            feedbackDiv.innerHTML = `<h2 class="text-center">Removed a Node with the value of ${nodeValueInput} at position ${position}</h2>`
            updateRoot()
        },1000)
        
    } else{
        feedbackDiv.innerHTML = `<h2 class="text-center">Could not remove/find the Node with a value of ${nodeValueInput}</h2>`
    }
    
}

function resetNodes(){
    feedbackDiv.innerHTML= ""
    let linkedListNodes = document.querySelectorAll('.col-2')
    linkedListNodes.forEach(node=>{
        node.firstChild.classList.remove('bg-success')
    })
}

function updateFeedback(renderString){
    `<h2 class="text-center">${renderString}</h2>`
}

function findNode(){
    resetNodes()
    let nodeValueInput = parseInt(document.getElementById('node-integer-value').value)
    let position = LL.find(nodeValueInput)
    
    if (position){
        let linkedListNodes = document.querySelectorAll('.col-2')
        linkedListNodes[position-1].firstChild.classList.add('bg-success')
        feedbackDiv.innerHTML = `<h2 class="text-center">Found a Node with the value of ${nodeValueInput} at position ${position}</h2>`
    } else (
        feedbackDiv.innerHTML = `<h2 class="text-center">Could not find a Node with the value ${nodeValueInput}</h2>`
    )
    
}

function createLinkedList(){
    if (initializedLL === false){
        LL = new LinkedList()
        feedbackDiv.innerHTML = "<h2 class='text-center'>Linked List initialized. You can now add Nodes to your Linked List.</h2>"
        linkedListSpace.innerHTML=""
        initializedLL = true
    } else {
        feedbackDiv.innerHTML = "<h2 class='text-center'>You've already created one! You can add Nodes to your Linked List.</h2>"
    }
    
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


function createArrows(){
    var arrowDiv = document.createElement('div')
    arrowDiv.className= "col-1 animate__animated animate__fadeInDown d-flex align-items-center arrow"
    arrowDiv.innerHTML = `<img class="mx-auto" src=${RIGHT_ARROW_PATH} height="25px" />`
    return arrowDiv
}

