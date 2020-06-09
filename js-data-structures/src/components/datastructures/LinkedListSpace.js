import React from 'react'
import rightArrow from './right-arrow.svg'
import {MDBCard,MDBCardTitle,MDBCardText,MDBCardBody,MDBCol} from 'mdbreact'


class LinkedListSpace extends React.Component{
    constructor(props){
        super(props)
    }

    renderLinkedList = () => {
        //iterate over the props and create a component for each node
        //let renderArray = []
        //this.traverseLinkedList(renderArray)
        
        return this.props.linkedList.map((number,index)=>{
            return(
                    <>
                        <MDBCol size="2" key={index} className="mt-2 nodes">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle tag="h5">
                                        Node
                                    </MDBCardTitle>
                                    <MDBCardText>
                                        Value: {number}
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        
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