let RIGHT_ARROW_PATH = './right-arrow.svg'
let linkedListButton = document.getElementById('linked-list')
let linkedListSpace = document.getElementById('linked-list-space')
let newLinkedList = document.getElementById('new-linked-list')
let newLLNode = document.getElementById('new-node')
let LLMethods = document.getElementById('linked-list-methods')
let findNodeValue = document.getElementById('find-linked-list')
let feedbackDiv = document.getElementById('feedback')
let deleteLLNode = document.getElementById('delete-linked-list-node')
let insertNodeLL = document.getElementById('insert-linked-list')
let initializedLL = false

newLinkedList.addEventListener('click',createLinkedList)
newLLNode.addEventListener('click',addNodeDiv)
findNodeValue.addEventListener('click',animateFindNodes)
deleteLLNode.addEventListener('click',deleteNode)
insertNodeLL.addEventListener('click',insertAtPosition)
linkedListButton.addEventListener('click',openLinkedList)



/////////////////////////
//
//  LINKED LISTS
//
////////////////////////


function openLinkedList(){
    document.getElementById('display-linked-list').classList.remove('d-none')
    document.getElementById('display-linked-list').classList.add('animate__animated','animate__fadeInUp')

    document.getElementById('choose-ds').classList.add('d-none')

}

function insertAtPosition(){
    let nodeToAdd = new Node(parseInt(document.getElementById('node-insert').value))
    let nodePosition = parseInt(document.getElementById('node-position').value)
    LL.insertBeforeAtPosition(nodeToAdd,nodePosition)
    findNodeDivPosition(nodeToAdd,RIGHT_ARROW_PATH,nodePosition)
    feedbackDiv.innerHTML = `<h2 class="text-center">Inserted a Node with a value of ${nodeToAdd.value} and position ${nodePosition}.</h2>`
    
}

function findNodeDivPosition(nodeToAdd,right_arrow_path,position){
    let currentNodePosition = 0
    for (var i = 0 ;i < linkedListSpace.childNodes.length ; i++){
        if (linkedListSpace.childNodes[i].id.includes('node')){
            currentNodePosition++
            if (currentNodePosition === position){
                insertArrowsBefore(right_arrow_path,i)
                createNodeDiv(nodeToAdd,i)
            }
        }
    }
}

function animateFindNodes(){
    resetNodes()
    let nodeValueInput = parseInt(document.getElementById('node-find').value)
    let position = LL.find(nodeValueInput)
    if(position){
        feedbackDiv.innerHTML = `<h2 class="text-center">Searching for a Node with a value of ${nodeValueInput}.</h2>`
        let linkedListNodes = document.querySelectorAll('.col-2')

        for(var i = 0 ; i < position - 1 ;i++){
            turnNodeToRed(i,linkedListNodes)
        }
        setTimeout(()=>{
            turnNodeToGreen(position,nodeValueInput,linkedListNodes)
        },270*position-2)

    } else {
        feedbackDiv.innerHTML = `<h2 class="text-center">Did not find a Node with the value of ${nodeValueInput}.</h2>`
    }

}

function turnNodeToGreen(position,nodeValue,nodeList){
    nodeList[position-1].firstChild.classList.add('bg-success')
    feedbackDiv.innerHTML = `<h2 class="text-center">Found a Node with the value of ${nodeValue} at position ${position}</h2>`
}

function turnNodeToRed(i,array){
    setTimeout(()=>{
        array[i].firstChild.classList.add('bg-danger')
        setTimeout(()=>{
            array[i].firstChild.classList.remove('bg-danger')
        },350)
    },300*i)
}

function animateNodeRemoval(position,nodeList){
    nodeList[position-1].classList.remove('animate__fadeInDown')
    nodeList[position-1].classList.add('animate__fadeOut')
}

function removeNodeAndArrowDiv(position,arrowDivList,nodeList){
    linkedListSpace.removeChild(nodeList[position-1])
    linkedListSpace.removeChild(arrowDivList[position-1])
}


function deleteNode(){
    let nodeValueInput = parseInt(document.getElementById('node-delete').value)
    let position = LL.delete(nodeValueInput)
    LL.printValues()

    if(position){

        let linkedListNodes = document.querySelectorAll('.col-2')
        let arrowDivs = document.querySelectorAll('.arrow')

        // remove div
        animateNodeRemoval(position,linkedListNodes)

        setTimeout(()=>{
            removeNodeAndArrowDiv(position,arrowDivs,linkedListNodes)
            feedbackDiv.innerHTML =`<h2 class="text-center">Removed a Node with the value of ${nodeValueInput} at position ${position}</h2>`
            updateRoot()
        },1000)
        
    } else {

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
    // change to forEach method?
    for(var i=0;i < linkedListSpace.childNodes.length;i++){
        i===0 ? linkedListSpace.childNodes[i].style.textDecoration="underline": linkedListSpace.childNodes[i].style.textDecoration="none"
    }
}

function addNodeDiv(){
    let nodeToAdd = createNodes()
    LL.add(nodeToAdd)


    if (LL.size === 0){
        linkedListSpace.innerHTML = ""
    } else {
        insertArrowsBefore(RIGHT_ARROW_PATH,0)
    }

    createNodeDiv(nodeToAdd,0)
    updateRoot()
    
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function insertArrowsBefore(arrowPath,position){
    arrowDiv = createArrows(arrowPath)
    linkedListSpace.insertBefore(arrowDiv,linkedListSpace.childNodes[position])
}

function createNodeDiv(nodeToAdd,position){
    var newDiv = document.createElement('div')
    newDiv.id = `node-${LL.size}-${nodeToAdd.value}`
    newDiv.className = 'col-2 text-center animate__animated animate__fadeInDown mt-3'
    newDiv.innerHTML = `<div class="card"><h3 class="card-header">Node</h3><div class="card-body"><h4><span class="align-middle">Value: ${nodeToAdd.value}</span></h4></div></div>`
    linkedListSpace.insertBefore(newDiv,linkedListSpace.childNodes[position])
}


function createArrows(arrowPath){
    var arrowDiv = document.createElement('div')
    arrowDiv.className= "col-1 animate__animated animate__fadeInDown d-flex align-items-center arrow"
    arrowDiv.innerHTML = `<img class="mx-auto" src=${arrowPath} height="25px" />`
    return arrowDiv
}

/////////////////////////
//
//  BINARY SEARCH TREES
//
////////////////////////

let binarySearchTreeButton = document.getElementById('binary-trees')
let addTreeNodeButton = document.getElementById('add-tree-node')
let c = document.getElementById('binary-tree-space')
let initializeBT = document.getElementById('initialize-bt')
let binaryTreeFeedback = document.getElementById('bt-feedback')
let depthFirstSearchButton = document.getElementById('depth-first-search')
let breadthFirstSearchButton = document.getElementById('breadth-first-search')

const STARTING_X = 250
const STARTING_Y = 50
const RADIUS = 10

initializeBT.addEventListener('click',createBinaryTree)
addTreeNodeButton.addEventListener('click',addTreeNode)
binarySearchTreeButton.addEventListener('click',openBinarySearchTrees)
depthFirstSearchButton.addEventListener('click',startDepthFirstSearch)
breadthFirstSearchButton.addEventListener('click',startBreadthFirstSearch)

function startDepthFirstSearch(){
    let tree_items=[]
    console.log(BT.depthFirstSearch(tree_items,BT.root))
}

function startBreadthFirstSearch(){
    let tree_items = []
    console.log(BT.breadthFirstSearch(tree_items,BT.root))
}

function openBinarySearchTrees(){
    document.getElementById('display-binary-trees').classList.remove('d-none')
    document.getElementById('display-binary-trees').classList.add('animate__animated','animate__fadeInUp')
    document.getElementById('choose-ds').classList.add('d-none')
}

function drawTreeNode(x,y,radius,value){
    var ctx = c.getContext("2d")
    ctx.beginPath()
    ctx.arc(x,y,radius,0,2*Math.PI)
    ctx.fillText(value,x-radius/2,y+radius/2)
    ctx.strokeStyle = "blue"
    ctx.stroke()
}

function addTreeNode(){
    // create new node with number
    let btNode = new BTNode(val = randomIntFromInterval(1,99))
    if (BT.size === 0){
        btNode.x = STARTING_X
        btNode.y = STARTING_Y
    }
    // add to binary tree
    BT.addTreeNode(btNode)
    console.log(BT)
    drawTreeNode(btNode.x,btNode.y,RADIUS,btNode.val)
}


function createBinaryTree(){
    BT = new BinarySearchTree()
    binaryTreeFeedback.innerHTML = "Successfully created Binary Tree. You can add nodes to this tree now."
}

