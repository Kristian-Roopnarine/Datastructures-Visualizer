import React from 'react'
import BinarySearchTreeNodes from './BinarySearchTreeNodes'
import Delayed from './Delayed'
import {MDBContainer,MDBCol,MDBRow} from 'mdbreact'

class BinarySearchTreeCanvas extends React.Component{
    constructor(props){
        super(props)
    }
    
    // render the nodes by mapping over them
    renderAnimations = () => {
        if(this.props.animating){
            if (this.props.animation === "BFS"){
                let renderArray = []

                if(this.props.currentBST.root === null){
                    return
                }

                this.props.renderingArray.map((node,index)=>{
                    renderArray.push(<Delayed waitBeforeShow={500*node.depth}><BinarySearchTreeNodes
                        key = {node.x,node.val}
                        x = {node.x}
                        y = {node.y}
                        r={20}
                        stroke={"green"}
                        node = {node}
                        nodeValue = {node.val}
                    /></Delayed>)
                })
                return renderArray

            } else if (this.props.animation === "DFS"){
                let renderArray = []

                if(this.props.currentBST.root === null){
                    return
                }

                this.props.renderingArray.map((node,index)=>{
                    renderArray.push(<Delayed waitBeforeShow={500*index}><BinarySearchTreeNodes
                        key = {node.x,node.val}
                        x = {node.x}
                        y = {node.y}
                        r={20}
                        stroke={"green"}
                        node = {node}
                        nodeValue = {node.val}
                    /></Delayed>)
                })
                return renderArray
            }
        }
    }


    renderOriginalBST = () => {
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
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                        <svg width={500} height={500}>
                            {this.props.animating ? this.renderAnimations(): ""}
                        </svg>
                        </MDBCol>
                        
                        <MDBCol>
                        <svg width={500} height={500}>
                            {this.renderOriginalBST()}
                        </svg>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>

        )
    }
}

export default BinarySearchTreeCanvas