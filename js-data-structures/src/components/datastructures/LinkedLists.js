import React from 'react'
import {MDBBtn,MDBContainer,MDBRow} from 'mdbreact'
import {LinkedList,Node,createNodes} from './datastructure-code/LinkedListCode'

class LinkedLists extends React.Component{
    constructor(props){
        super(props)
        this.state = {feedBack:"", LL:false}
    }

    initializeLinkedList = () => {
        if (this.state.LL === false){
            this.setState({...this.state,feedBack:"Successfully created Linked list.",LL:new LinkedList()},()=>console.log(this.state.LL))
        } else {
            this.setState({...this.state,feedBack:"You've already created a linked list. You can add nodes to this data structure."})
        }
    }

    addNode = () => {
        let newNode = createNodes()
        let middleLL = this.state.LL
        middleLL.add(newNode)
        this.setState({...this.state,LL:middleLL})
    }

    render(){
        return(
            <MDBContainer>
                <MDBBtn onClick={this.initializeLinkedList}>
                    Initialize Linked List
                </MDBBtn>

                <MDBBtn color="primary" onClick={this.addNode}>
                    Add random integer node to Linked List
                </MDBBtn>
                <MDBBtn color="warning">
                    Find Node
                </MDBBtn>
                <MDBBtn color="danger">
                    Delete Node
                </MDBBtn>
                <MDBBtn color="info">
                    Insert Node before position
                </MDBBtn>
                <MDBRow>
                    <h3>{this.state.feedBack}</h3>
                </MDBRow>
                <MDBRow>
                    <h3>{this.state.LL.size}</h3>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default LinkedLists