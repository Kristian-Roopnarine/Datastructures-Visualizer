import React from 'react'
import BinarySearchTreeCanvas from './BinarySearchTreeCanvas.js'
import {MDBBtn} from 'mdbreact'
import {BTNode,BinarySearchTree, randomIntFromInterval} from './datastructure-code/BinarySearchTreeCode.js'

const STARTING_X = 250
const STARTING_Y = 25

class BinarySearchTrees extends React.Component {
    constructor(props){
        super(props)
        this.state = {BST:new BinarySearchTree(),feedBack:"Add nodes to the tree",renderArray:[],valueArray:[],animating:false,animation:""}
    }

    resetState = () => {
        this.setState({
            ...this.state,
            animating:false,
            animation:"",
            renderArray:[],
            valueArray:[]
        },()=>console.log(this.state))
        
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
    }

    animateDepthFirst = () => {
        this.setState({
            ...this.state,
            animating:false,
            animation:"",
            renderArray:[],
            valueArray:[]
        },()=>{
            if (this.state.BST.root !== null){
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
        })
        
    }

    animateBreadthFirst = () => {
        this.setState({
            ...this.state,
            animating:false,
            animation:"",
            renderArray:[],
            valueArray:[]
        },()=>{
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
        })
        
    }

    animateInOrderTraversal = () => {
        this.setState({
            ...this.state,
            animating:false,
            animation:"",
            renderArray:[],
            valueArray:[]
        },()=>{
            if (this.state.BST.root !== null){
                let auxRenderArray = []
                let auxValueArray = []
                
                let finalArrays = this.inOrderTraversal(this.state.BST.root,auxRenderArray,auxValueArray)
    
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
        })
    }

    inOrderTraversal = (node,auxRenderArray,auxValueArray) => {
        
        if (node !== null){
            this.inOrderTraversal(node.left,auxRenderArray,auxValueArray)
            auxValueArray.push(node.val)
            auxRenderArray.push({...node})
            this.inOrderTraversal(node.right,auxRenderArray,auxValueArray)
        }

        return [auxValueArray,auxRenderArray]
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
        return(
            <>
                <div>You're viewing Binary Search Trees</div>
                <MDBBtn color="primary" onClick={this.drawTreeNode}>Add tree node</MDBBtn>

                <MDBBtn color="primary" onClick={(e)=>this.animateDepthFirst(e)}>Depth First Search (Pre Order traversal)</MDBBtn>

                <MDBBtn color="primary" onClick={(e)=> this.animateBreadthFirst()}>Breadth First Search</MDBBtn>

                <MDBBtn color="primary" onClick={(e)=> this.animatePostOrderTraversal()}>Post Order Traversal</MDBBtn>

                <MDBBtn color="primary" onClick={(e)=> this.animateInOrderTraversal()}>In Order Traversal</MDBBtn>

                <div>
                    <h3>Node traversal order :{valueArray.join(",")}</h3>
                </div>

                <BinarySearchTreeCanvas animating={this.state.animating} currentBST={this.state.BST} renderingArray={this.state.renderArray} animation={this.state.animation}/>
                
            </>
        )
    }
}

export default BinarySearchTrees