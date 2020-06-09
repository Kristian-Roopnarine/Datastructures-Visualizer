import React from 'react'
import LinkedListSpace from './LinkedListSpace'
import {MDBBtn,MDBContainer,MDBRow,MDBInput} from 'mdbreact'
import {LinkedList,Node,createNodes} from './datastructure-code/LinkedListCode'

class LinkedLists extends React.Component{
    constructor(props){
        super(props)
        this.state = {feedBack:"", LL:false,renderArray:[],findNode:"",insertNode:"",position:"",deleteNode:""}
    }

    initializeLinkedList = () => {
        if (this.state.LL === false){
            this.setState({...this.state,feedBack:"Successfully created Linked list.",LL:new LinkedList()},()=>console.log(this.state.LL))
        } else {
            this.setState({...this.state,feedBack:"You've already created a linked list. You can add nodes to this data structure."})
        }
    }

    findNode = () => {
        let nodeToFind = parseInt(this.state.findNode)
        let position = this.state.LL.find(nodeToFind)
        if(position){
            this.setState({
                ...this.state,
                feedBack:`Found a node with the value of ${nodeToFind} at position ${position}`
            })
        } else {
            this.setState({
                ...this.state,
                feedBack:`Could not find a node with the value of ${nodeToFind}.`
            })
        }
        this.resetNodeDivs('bg-success')
        this.animateNode(position,'bg-success')
    }

    deleteNode = () => {
        let nodeToDelete = parseInt(this.state.deleteNode)
        let position = this.state.LL.delete(nodeToDelete)

        if(position){

            this.animateDeleteNode(position)

            // there's something with the zoomOutDown class that doesn't allow me to update state properly
            setTimeout(()=>{
                const zoomOutDivs = document.getElementsByClassName('zoomOutDown')
                zoomOutDivs[0].classList.remove('zoomOutDown')
                zoomOutDivs[0].classList.remove('zoomOutDown')

            },500)
            
            setTimeout(()=>{
                let newArray = this.state.renderArray.filter((number,index) => index !== position - 1)
                this.setState({
                    ...this.state,
                    renderArray:newArray,
                    feedBack:`Deleted a node with the value of ${nodeToDelete} at position ${position}`
                })
            },600)
        
            /*
            setTimeout(()=>{
                this.removeNodeAndArrowDiv(position)
            },1000)
            */
        } else {
            this.setState({
                ...this.state,
                feedBack:`Could not find a node with the value of ${nodeToDelete}.`
            })
        }
        console.log(this.state.renderArray)
    }

    animateDeleteNode = (position) => {
        const nodeDivs = document.getElementsByClassName('nodes')
        const arrowDivs = document.getElementsByClassName('arrows')
        for(var i = 0 ; i < nodeDivs.length ;i++){
            if (i === position-1){
                nodeDivs[i].classList.add('animated','zoomOutDown')
                arrowDivs[i].classList.add('animated','zoomOutDown')
            }
        }
    }

    animateNode = (position,className=null) => {
        const nodeDivs = document.getElementsByClassName('nodes')
        for(var i = 0 ; i < nodeDivs.length ;i++){
            if (i === position-1){
                nodeDivs[i].firstChild.classList.add(className)
            } 
        }
    }

    resetNodeDivs = (className) =>{
        const nodeDivs = document.getElementsByClassName('nodes')
        const arrowDivs = document.getElementsByClassName('arrows')
        for(var i = 0 ; i < nodeDivs.length ;i++){
                nodeDivs[i].firstChild.classList.remove(className)
            } 
        }
    

    addNode = () => {
        let newNode = createNodes()
        let middleLL = this.state.LL
        middleLL.add(newNode)
        let list = [newNode.value,...this.state.renderArray]
        this.setState({...this.state,LL:middleLL,renderArray:list})
    }

    onInputChange = (e) =>{
        this.setState({...this.state,[e.target.id]:e.target.value})
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

                <MDBInput label="Node to find" value={this.state.findNode} id="findNode" onChange={this.onInputChange}></MDBInput>
                <MDBBtn  onClick={this.findNode} color="warning">
                    Find Node
                </MDBBtn>

                <MDBInput label="Node to delete" value={this.state.deleteNode} id="deleteNode" onChange={this.onInputChange}></MDBInput>

                <MDBBtn color="danger" onClick={this.deleteNode}>
                    Delete Node
                </MDBBtn>

                <MDBBtn color="info">
                    Insert Node before position
                </MDBBtn>

                <MDBRow>
                    <h3>{this.state.feedBack}</h3>
                </MDBRow>

                <MDBRow>
                    <LinkedListSpace linkedList={this.state.renderArray}/>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default LinkedLists