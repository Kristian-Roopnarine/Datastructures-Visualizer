import React from 'react'
import BinarySearchTreeCanvas from './BinarySearchTreeCanvas.js'
import {MDBBtn} from 'mdbreact'
import {BTNode,BinarySearchTree, randomIntFromInterval} from './datastructure-code/BinarySearchTreeCode.js'

const STARTING_X = 500
const STARTING_Y = 50

class BinarySearchTrees extends React.Component {

    state = {BST:new BinarySearchTree(),feedBack:"Add nodes to the tree",renderArray:[],renderValues:[],auxBST:null}

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
            renderArray:[this.state.BST]
        })
        // force re render
        this.forceUpdate()
    }

    animateDepthFirst = () => {
        if (this.state.BST.root !== null){
            // copying the pointer to this bst
            // might need to create a new bst at each iteration
            let auxBST = this.state.BST
            console.log(auxBST)
            let auxRenderArray = []
            let auxValueArray = []
            
            let finalArrays = this.depthFirstSearch(auxValueArray,auxRenderArray,auxBST.root,auxBST)

            auxValueArray = finalArrays[0]
            auxRenderArray = finalArrays[1]

            this.setState({
                ...this.state,
                renderArray:auxRenderArray,
                valueArray:[auxValueArray]
            })
            this.renderAuxArrays()
            
        }
    }

    renderAuxArrays = () => {
        const oldBST = this.state.BST
        console.log(this.state.renderArray)
        /*
        for (var i = 0;i < this.state.renderArray.length ; i++){
            setTimeout((i) => {
                const auxArray = this.state.renderArray[i]
                console.log(auxArray)
                this.setState({
                    BST:auxArray
                })
            }, 10000*i,i);
        }
        */
        const auxArray = this.state.renderArray[0]
        this.setState({
            BST:auxArray
        })

    }



    animateBreadthFirst = () => {
        if (this.state.BST.root !== null){
            this.breadthFirstSearch(this.state.BST.root)
            
        }
    }

    // provide an animation for each node
    
    depthFirstSearch = (valueArray,renderArray,node,auxBST) => {
        //push current bst to render array
        renderArray.push(auxBST)
        node.visited=true
        // push current node value to render array
        valueArray.push(node.val)
        

        if (node.left){
            this.depthFirstSearch(valueArray,renderArray,node.left,auxBST)
        }
        
        
        if (node.right){
            this.depthFirstSearch(valueArray,renderArray,node.right,auxBST)
        }
    
        return [valueArray,renderArray]
    }
    

    breadthFirstSearch = (node) => {
        let queue = [node]

        while(queue.length!== 0){
            
            let currentNode = queue.shift()
            console.log(currentNode)

            setTimeout(()=>{
                currentNode.visited=true
                this.setState({
                    ...this.state
                })
            },1000*currentNode.depth,currentNode)
            
            
            
            //array.push(currentNode.val)
            if (currentNode.left) queue.push(currentNode.left)
            if(currentNode.right) queue.push(currentNode.right)
            
        }
        return
    }

    render(){
        
        return(
            <>
                <div>You're viewing Binary Search Trees</div>
                <MDBBtn color="primary" onClick={this.drawTreeNode}>Add tree node</MDBBtn>

                <MDBBtn color="primary" onClick={(e)=>this.animateDepthFirst(e)}>Depth First Search</MDBBtn>

                <MDBBtn color="primary" onClick={(e)=> this.animateBreadthFirst()}>Breadth First Search</MDBBtn>

                <BinarySearchTreeCanvas currentBST={this.state.BST} renderingArray = {this.state.renderArray}/>
                
            </>
        )
    }
}

export default BinarySearchTrees