export const TREE_NODE_SPACE_X = 50
export const TREE_NODE_SPACE_Y = 75


export class BTNode {
    constructor(val,x=0,y=0){
        this.val = val
        this.right = null
        this.left = null
        this.parent = null
        this.x = x
        this.y = y
        this.visited=false
        this.depth = 0
    }

    addNode(node){
        if (node.val < this.val){
            if(this.left == null){
                this.left = node
                node.parent = this
                node.depth = this.depth + 1
    
                node.updatePosition(this.x - TREE_NODE_SPACE_X, this.y + TREE_NODE_SPACE_Y)
                
                      
            } else {
                this.left.addNode(node)
            }
            
        } else if (node.val > this.val){
            if (this.right == null){
                this.right = node
                node.parent = this
                node.depth = this.depth + 1
        
                node.updatePosition(this.x + TREE_NODE_SPACE_X, this.y + TREE_NODE_SPACE_Y)
                 
                
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
        let currentNode = node
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


export class BinarySearchTree{
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

        node.visited = true
        
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
            node.visited = true

            // put value into array
            array.push(currentNode.val)

            // add children to queue
            if (currentNode.left) queue.push(currentNode.left)
            if (currentNode.right) queue.push(currentNode.right)
        }
        
        return array
    }
}

export function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}