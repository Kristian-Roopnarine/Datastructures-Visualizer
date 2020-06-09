import React from 'react'
import LinkedLists from './LinkedLists'
import BinarySearchTrees from './BinarySearchTrees'

class DataStructures extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        let dataStructure;
        if (this.props.type === "Linked List"){
            dataStructure = <LinkedLists />
        } else if (this.props.type === "Binary Search Tree"){
            dataStructure = <BinarySearchTrees />
        } else {
            dataStructure = <div>Oops there was an error.</div>
        }
        return (
            <>
                {dataStructure}
            </>
        )
    }
}

export default DataStructures