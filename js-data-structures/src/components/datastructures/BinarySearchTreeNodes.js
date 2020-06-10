import React from 'react'

class BinarySearchTreeNodes extends React.Component{
    constructor(props){
        super(props)
    }



    render(){
        return(
            <>
                <circle 
                    cx={this.props.x} 
                    cy={this.props.y}
                    r={this.props.r}
                    stroke={this.props.stroke}
                >
                </circle>
                <text
                    x={this.props.x}
                    y={this.props.y}
                    textAnchor = "middle"
                    stroke={this.props.stroke}
                >
                    {this.props.nodeValue}
                </text>
            </>
        )
    }
}

export default BinarySearchTreeNodes