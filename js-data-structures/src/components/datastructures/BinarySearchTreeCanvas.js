import React from 'react'
import BinarySearchTreeNodes from './BinarySearchTreeNodes'

class BinarySearchTreeCanvas extends React.Component{
    constructor(props){
        super(props)
    }
    
    // render the nodes by mapping over them
    renderBinarySearchTree = () => {
        let renderArray = []
        if(this.props.currentBST.root === null){
            return
        }
        let queue = [this.props.currentBST.root]

        while (queue.length !== 0 ){
            const currentNode = queue.shift()

            renderArray.push(
                <BinarySearchTreeNodes
                    key = {currentNode.x,currentNode.val}
                    x = {currentNode.x}
                    y = {currentNode.y}
                    r={20}
                    stroke={currentNode.visited ? "green":"red"}
                    node = {currentNode}
                    nodeValue = {currentNode.val}
                />
            )
            if (currentNode.left) queue.push(currentNode.left)
            if (currentNode.right) queue.push(currentNode.right)
        }
        return renderArray
    }

    

    render(){
        return(
            <>
                <svg width={1000} height={1000}>
                    {this.renderBinarySearchTree()}
                </svg>
            </>

        )
    }
}

export default BinarySearchTreeCanvas