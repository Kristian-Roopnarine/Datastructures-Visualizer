import React from 'react'

class BinarySearchTreeNodes extends React.Component{
    constructor(props){
        super(props)
    }

    renderLine(){
        if(this.props.node.parent!== null){
            return(
                <line 
                    x1={this.props.node.parent.x} 
                    y1={this.props.node.parent.y}
                    x2={this.props.node.x}
                    y2={this.props.node.y}
                    style={{stroke:"green",strokeWidth:2}} />
            )
        }
    }

    render(){
        return(
            <>
                {this.renderLine()}
                
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