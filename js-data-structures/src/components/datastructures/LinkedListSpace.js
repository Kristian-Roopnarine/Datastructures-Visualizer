import React from 'react'
import rightArrow from './right-arrow.svg'
import LinkedListNodes from './LinkedListNodes'
import {MDBCard,MDBCardTitle,MDBCardText,MDBCardBody,MDBCol} from 'mdbreact'


class LinkedListSpace extends React.Component{
    constructor(props){
        super(props)
    }

    renderLinkedList = () => {
        //iterate over the props and create a component for each node
        //let renderArray = []
        //this.traverseLinkedList(renderArray)
        
        return this.props.linkedList.map((node,index)=>{
            return(
                    <>
                        <LinkedListNodes value={node.nodeValue} idx={index} currentClass={node.currentClass}/>
                        
                        <MDBCol size="1" className="d-flex align-items-center arrows">
                                <img src={rightArrow} height="25px" className="mx-auto" />
                        </MDBCol>
                    </>
            )
        })
    }

    render(){
        return(
            <>
                {this.renderLinkedList()}
            </>
        )
    }
}

export default LinkedListSpace