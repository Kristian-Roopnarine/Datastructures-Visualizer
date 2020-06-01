// class for the nodes in a linked list

/* 
Nodes
Attributes: value, next
*/

class Node {
    constructor(value){
        this.value=value
        this.next=null
    }
}

// class for the LinkedList

/*
LinkedList
Attributes: size, root/head

Methods:
Add (Adds node to the head)
Find (Returns true if value is in linked list)
Delete (Deletes node from linked list)
Insert (Inserts item to linked list)

*/

class LinkedList {
    constructor(r=null){
        this.root = r
        this.size =0
    }

    add(node){
        if (this.root === null){
            this.root = node
            return
        } else {
            node.next = this.root
            this.root = node
        }
        this.size++
    }

    find(value){
        let thisNode = this.root
        let position = 1
        while (thisNode !== null){
            if (thisNode.value === value){
                return position
            } else {
                thisNode = thisNode.next
                position ++
            }
        }
        return false
    }

    delete(value){
        let thisNode = this.root
        let prevNode = null
        let position = 1

        while (thisNode !== null){
            if (thisNode.value === value){
                if (prevNode === null){
                    this.root = thisNode.next
                    thisNode.next = null
                    return position
                }
                prevNode.next = thisNode.next
                thisNode.next = null
                return position

            } else {
                prevNode = thisNode
                thisNode = thisNode.next
                position++
            }
        }

        return false
    }

    insertBefore(valueToFind,nodeToInsert){
        let thisNode = this.root
        let prevNode = null

        while (thisNode !== null) {
            if (valueToFind === thisNode.value){
                if (prevNode === null){
                    this.add(nodeToInsert)
                } else {
                    nodeToInsert.next = prevNode.next
                    prevNode.next = nodeToInsert
                    return
                }
            } else {
                prevNode = thisNode
                thisNode = thisNode.next
                
            }
        }
        return false
    }

    insertBeforeAtPosition(nodeToInsert,insertPosition){
        let thisNode = this.root
        let prevNode = null
        let position = 1

        while (thisNode !== null){
            if (insertPosition === position){
                nodeToInsert.next = thisNode
                prevNode.next = nodeToInsert
                return 
            } else {
                prevNode = thisNode
                thisNode = thisNode.next
                position++
            }
        }
        return false
    }

    printValues(){
        let thisNode=this.root
        console.log("Printing Nodes...")
        while(thisNode !== null){
            console.log(`Node Value: ${thisNode.value} Next Node: ${thisNode.next}`)
            thisNode = thisNode.next
        }
    }
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createNodes(){
    return new Node(randomIntFromInterval(0,99))
}   

function createLinkedList(){
    for (var i=0;i<6;i++){
        testLinked.add(nodes[i])
    }
}


//let LL = new LinkedList()
