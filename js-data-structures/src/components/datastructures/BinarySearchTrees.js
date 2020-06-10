import React from 'react'
import BinarySearchTreeCanvas from './BinarySearchTreeCanvas.js'
import {MDBBtn} from 'mdbreact'
import {BTNode,BinarySearchTree, randomIntFromInterval} from './datastructure-code/BinarySearchTreeCode.js'

const STARTING_X = 500
const STARTING_Y = 50

class BinarySearchTrees extends React.Component {

    state = {BST:new BinarySearchTree(),feedBack:"Add nodes to the tree",renderArray:[]}

    // we can have an array of Node objects. Should I draw the bst in the bst order?
    componentDidMount(){
        console.log(this.state.BST)
    }

    drawTreeNode = () => {
        // create node
        let treeNode = new BTNode(randomIntFromInterval(0,99))
        // add to bst
        if (this.state.BST.size === 0){
            treeNode.x = STARTING_X
            treeNode.y = STARTING_Y
        }
        this.state.BST.addTreeNode(treeNode)
        console.log(treeNode.depth)
        // force re render
        this.forceUpdate()
        console.log(this.state.BST)
    }

    // button to add nodes following the BST property
    render(){
        return(
            <>
                <div>You're viewing Binary Search Trees</div>
                <MDBBtn color="primary" onClick={this.drawTreeNode}>Add tree node</MDBBtn>
                <BinarySearchTreeCanvas bst={this.state.BST}/>
            </>
        )
    }
}

export default BinarySearchTrees