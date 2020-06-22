export const displayCode = {
  javaScript: {
    linkedList: {
      node: `
class Node {
    constructor(value){
        this.value=value
        this.next=null
    }
}
            `,
      constructor: `
class LinkedList {
    constructor(r=null){
        this.root = r
        this.size =0
    }
                `,
      add: `
add(node){
    if (this.root === null){
        this.root = node
    } else {
        node.next = this.root
        this.root = node
    }
    this.size++
}
            `,
      find: `
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
            `,
      delete: `
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
            `,
      insert: `
insertBeforeAtPosition(nodeToInsert,insertPosition){
    let thisNode = this.root
    let prevNode = null
    let position = 1

    while (thisNode !== null){
        if (insertPosition === position){
            nodeToInsert.next = thisNode
            prevNode.next = nodeToInsert
            this.size++
            return 
        } else {
            prevNode = thisNode
            thisNode = thisNode.next
            position++
        }
    }
    return false
}
            `,
    },
    binarySearchTrees: {
      node: `
class BTNode {
    constructor(val, x = 0, y = 0) {
        this.val = val;
        this.right = null;
        this.left = null;
        this.parent = null;
        this.x = x;
        this.y = y;
        this.visited = false;
        this.depth = 0;
    }
            `,
      add: `
addNode(node) {
    if (node.val < this.val) {
        if (this.left == null) {
        this.left = node;
        node.parent = this;
        node.depth = this.depth + 1;

        } else {
        this.left.addNode(node);
        }
    } else if (node.val > this.val) {
        if (this.right == null) {
        this.right = node;
        node.parent = this;
        node.depth = this.depth + 1;

        } else {
        this.right.addNode(node);
        }
    }
    }
        `,
      depthFirstSearch: `
depthFirstIterative = (root) => {
    let stack = [root];
    let res = []
    while (stack.length !== 0) {
        let curr = stack.pop();
        res.push(curr.val);
        if (curr.right) stack.push(curr.right);
        if (curr.left) stack.push(curr.left);
    }
    return res;
    };
        `,
      breadthFirstSearch: `
breadthFirstSearch = (node) => {
    let queue = [node];
    let res = [];

    while (queue.length !== 0) {
        let currentNode = queue.shift();

        res.push(currentNode.val);

        res.push(currentNode.val);
        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
    }
    return res;
    };
        `,
      postOrderTraversal: `
postOrderTraversal = (node, auxValueArray) => {
    if (node !== null) {
        this.postOrderTraversal(node.left,auxValueArray);
        this.postOrderTraversal(node.right,auxValueArray);
        auxValueArray.push(node.val);
        
    }
    return auxValueArray;
    };
        `,
      inOrderTraversal: `
inOrderTraversal = (node, auxValueArray) => {
    if (node !== null) {
        this.inOrderTraversal(node.left, auxValueArray);
        auxValueArray.push(node.val);
        this.inOrderTraversal(node.right, auxValueArray);
    }

    return auxValueArray;
    };
        `,
    },
  },
};
