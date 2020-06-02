class Node {
    constructor(val){
        this.val = val
        this.right = null
        this.left = null
    }

    addNode(node){
        if (node.val < this.val){
            if(this.left == null){
                this.left = node
            } else {
                this.left.addNode(node)
            }
            
        } else if (node.val > this.val){
            if (this.right == null){
                this.right = node
            } else {
                this.right.addNode(node)
            } 
        } 
    }

    searchNode(node){
        currentNode = node
        while (currentNode !== null){
            if (node.val < this.val){
                currentNode = currentNode.left
            } else if (node.val > this.val){
                currentNode = currentNode.right
            } else {
                return true
            }
        }
        return false
    }
}


class BinarySearchTree{
    constructor(r=null){
        this.root = r
    }
}

