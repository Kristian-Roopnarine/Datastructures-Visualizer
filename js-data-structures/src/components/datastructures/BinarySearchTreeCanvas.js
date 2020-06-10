import React from 'react'
import BinarySearchTreeNodes from './BinarySearchTreeNodes'

class BinarySearchTreeCanvas extends React.Component{
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        //const canvas = this.ref.canvas
        //const ctx = canvas.getContext("2d")
    }
    
    // render the nodes by mapping over them
    renderBinarySearchTree = () => {
        let renderArray = []
        if(this.props.bst.root ===null){
            return
        }
        let queue = [this.props.bst.root]
        
        while (queue.length !== 0 ){
            const currentNode = queue.shift()
            renderArray.push(
                <BinarySearchTreeNodes
                    key = {currentNode.x,currentNode.val}
                    x = {currentNode.x}
                    y = {currentNode.y}
                    r={40}
                    stroke={"green"}
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
                <div>Nodes will go here</div>
                <svg width={1000} height={1000}>
                    {this.renderBinarySearchTree()}
                </svg>
            </>

        )
    }
}

export default BinarySearchTreeCanvas