const TREE_NODE_SPACE_X = 25
const TREE_NODE_SPACE_Y = 25
const X_OFFSET = 20

class BTNode {
    constructor(val,x=0,y=0){
        this.val = val
        this.right = null
        this.left = null
        this.parent = null
        this.x = x
        this.y = y
    }

    addNode(node){
        if (node.val < this.val){
            if(this.left == null){
                this.left = node
                node.parent = this
                node.updatePosition(this.x - TREE_NODE_SPACE_X,this.y + TREE_NODE_SPACE_Y)
                
            } else {
                this.left.addNode(node)
            }
            
        } else if (node.val > this.val){
            if (this.right == null){
                this.right = node
                node.parent = this
                node.updatePosition(this.x + TREE_NODE_SPACE_X,this.y + TREE_NODE_SPACE_Y)
            } else {
                this.right.addNode(node)
            } 
        }
    
    }

    updatePosition(x=0,y=0){
        this.x = x
        this.y = y
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
        this.size = 0
    }

    addTreeNode(node){
        if(this.root === null){
            this.root = node
        }

        this.root.addNode(node)
        this.updateSize("add")
    }

    updateSize(type){
        if (type === "add"){
            this.size++
        }
        if (type === "sub"){
            this.size--
        }
    }

    depthFirstSearch(array,node){
        array.push(node.val)
        let children = []
        if (node.left){
            children.push(node.left)
        }
        if (node.right){
            children.push(node.right)
        }
        for (const child of children){
            this.depthFirstSearch(array,child)
        }

        return array
    }

    breadthFirstSearch(array,node){
        // put the node into a queue
        let queue = [node]

        while (queue.length !== 0){
            // pop node out
            const currentNode = queue.shift()

            // put value into array
            array.push(currentNode.val)

            // add children to queue
            if (currentNode.left) queue.push(currentNode.left)
            if (currentNode.right) queue.push(currentNode.right)
        }
        
        return array
    }
}

