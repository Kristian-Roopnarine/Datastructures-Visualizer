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
                if (node.parent.parent === null){
                    node.updatePosition(this.x - (TREE_NODE_SPACE_X * 2),this.y + TREE_NODE_SPACE_Y)
                } else {
                    node.updatePosition(this.x - (TREE_NODE_SPACE_X),this.y + TREE_NODE_SPACE_Y)
                }
                
            } else {
                this.left.addNode(node)
            }
            
        } else if (node.val > this.val){
            if (this.right == null){
                this.right = node
                node.parent = this
                if (node.parent.parent === null){
                    node.updatePosition(this.x + (TREE_NODE_SPACE_X * 2),this.y + TREE_NODE_SPACE_Y)
                } else {
                    node.updatePosition(this.x + (TREE_NODE_SPACE_X),this.y + TREE_NODE_SPACE_Y)
                }
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
}

