import React from 'react'
import BinarySearchTreeCanvas from './BinarySearchTreeCanvas.js'
import {MDBBtn} from 'mdbreact'
import {BTNode,BinarySearchTree, randomIntFromInterval} from './datastructure-code/BinarySearchTreeCode.js'

const STARTING_X = 250
const STARTING_Y = 25

class BinarySearchTrees extends React.Component {

    state = {BST:new BinarySearchTree(),feedBack:"Add nodes to the tree",renderArray:[],renderValues:[],animating:false,animation:""}

    // we can have an array of Node objects. Should I draw the bst in the bst order?
    componentDidMount(){
        this.setState({
            ...this.state,
            renderArray:[this.state.BST]
        })
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
        this.setState({
            ...this.state,
        })

        // force re render
        this.forceUpdate()
    }

    animateDepthFirst = () => {

        if (this.state.BST.root !== null){
            // creating an AUX bst doesn't work because this is a pointer to the actual bst
            // if we change the original, then the aux one changes too
            let auxRenderArray = []
            let auxValueArray = []
            
            let finalArrays = this.depthFirstIterative(this.state.BST.root)

            auxValueArray = finalArrays[0]
            auxRenderArray = finalArrays[1]

            this.setState({
                ...this.state,
                valueArray:auxValueArray,
                renderArray:auxRenderArray,
                animation:"DFS",
                animating:true
            
            })

            
        }
    }

    animateBreadthFirst = () => {
        if (this.state.BST.root !== null){
            let finalArray = this.breadthFirstSearch(this.state.BST.root) 
            this.setState({
                ...this.state,
                renderArray:finalArray[1],
                valueArray:finalArray[0],
                animation:"BFS",
                animating:true
            })
        }
    }


    depthFirstIterative = (root) =>{
        let stack = [root]
        let res = []
        let renderAnimations = []
        while (stack.length !== 0 ){
            
            let curr = stack.pop()
            renderAnimations.push({...curr})
            
            res.push(curr.val)
            if(curr.right)stack.push(curr.right)
            if(curr.left)stack.push(curr.left)
         
        }
        return [res,renderAnimations]

    }

    breadthFirstSearch = (node) => {
        let queue = [node]
        let renderAnimations = []
        let res = []

        while(queue.length!== 0){
            
            let currentNode = queue.shift()
            
            renderAnimations.push({...currentNode})
            
            res.push(currentNode.val)
            if (currentNode.left) queue.push(currentNode.left)
            if(currentNode.right) queue.push(currentNode.right)
            
        }
        return [res,renderAnimations]
    }



    render(){
        const valueArray = this.state.valueArray || []
        const renderValueArray = valueArray.map((value,index)=>
            (<li key={index}>{value}</li>)
        )
        return(
            <>
                <div>You're viewing Binary Search Trees</div>
                <MDBBtn color="primary" onClick={this.drawTreeNode}>Add tree node</MDBBtn>

                <MDBBtn color="primary" onClick={(e)=>this.animateDepthFirst(e)}>Depth First Search</MDBBtn>

                <MDBBtn color="primary" onClick={(e)=> this.animateBreadthFirst()}>Breadth First Search</MDBBtn>
                <div>
                    <ul>{renderValueArray}</ul>
                </div>

                <BinarySearchTreeCanvas animating={this.state.animating} currentBST={this.state.BST} renderingArray={this.state.renderArray} animation={this.state.animation}/>
                
            </>
        )
    }
}

export default BinarySearchTrees