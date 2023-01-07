import React from 'react'
import "../../css/binarytree/Top.css"

export const Top = ({states}) => {
    let {root} = states;
    let onEnter = (e) => {
        e.target.querySelector("ul").style.setProperty("visibility", "visible")
    }
    let onLeave = () => {
        document.querySelectorAll(".bt-top>.bottom>button>ul").forEach((l)=>{
            l.style.setProperty("visibility", "hidden");
        })
    }

    return (
        <div className="bt-top">
            <div className="top">
                <button>Total Nodes: <strong> {root.childrenCount()+1} </strong></button>
                <button>Total Levels: <strong> {root.getLevels2D().length} </strong></button>
                <button>Depth / Height: <strong> {root.height()} </strong></button>
                <button>Width: <strong> {root.width()} </strong></button>
            </div>
            <div className="bottom">
                <button className={`${(root.isFullBinaryTree())?"true":""}`} onMouseEnter={(e)=>onEnter(e)} onMouseLeave={onLeave}>
                    Full Binary Tree
                    <ul>
                        <li>Every Node has 2 or no children</li>
                    </ul>
                </button>
                <button className={`${(root.isPerfectBinaryTree())?"true":""}`} onMouseEnter={(e)=>onEnter(e)} onMouseLeave={onLeave}>
                    Perfect Binary Tree
                    <ul>
                        <li>A Full Binary Tree</li>
                        <li>Every Node has 2 or no children</li>
                        <li>All Leafs on same Level</li>
                    </ul>
                </button>
                <button className={`${(root.isCompleteBinaryTree())?"true":""}`} onMouseEnter={(e)=>onEnter(e)} onMouseLeave={onLeave}>
                    Complete Binary Tree
                    <ul>
                        <li>Levels are all filled</li>
                        <li>Leaf elements lean towards left</li>
                    </ul>
                </button>
                <button className={`${(root.isBalancedBinaryTree())?"true":""}`} onMouseEnter={(e)=>onEnter(e)} onMouseLeave={onLeave}>
                    Balanced Binary Tree
                    <ul>
                        <li>Balance Factor is either 0, 1 or -1</li>
                        <li>Height of child nodes differ by 0 or 1</li>
                    </ul>
                </button>

                
            </div>
        </div>
    )
}
