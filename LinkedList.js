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
    }

    find(value){
        thisNode = this.root
        while (thisNode !== null){
            if (thisNode.value === value){
                return true
            } else {
                thisNode=thisNode.next
            }
        }
        return false
    }

    delete(value){
        thisNode = this.root
        prevNode = null

        while (thisNode !== null){
            if (thisNode.value === value){
                if (prevNode === null){
                    this.root = thisNode.next
                    thisNode.next = null
                }
                prevNode.next = thisNode.next
                thisNode.next = null
                return
            } else {
                prevNode = thisNode
                thisNode = thisNode.next
            }
        }

        return false
    }

    insert(valueToFind,nodeToInsert){
        thisNode = this.root
        prevNode = null

        while(thisNode !== null){
            if (valueToFind === thisNode.value){
                if (prevNode === null){
                    this.add(nodeToInsert)
                } else {
                    nodeToInsert.next = prevNode.next
                    prevNode.next = nodeToInsert
                    return
                }
            } else {
                prevNode=thisNode
                thisNode=thisNode.next
            }
        }
        return false
    } 
}