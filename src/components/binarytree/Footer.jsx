import React from 'react'
import "../../css/binarytree/Footer.css"

export const Footer = ({ states }) => {
    let keyCounter = 0;
    return (
        <div className='bt-footer'>
            <div className="left">
                <div>
                    {/* <h3>  */}
                        PreOrder Traversal
                    {/* </h3> */}
                 </div>
                <div>
                    {/* <h3>  */}
                        InOrder Traversal
                    {/* </h3> */}
                 </div>
                <div>
                    {/* <h3>  */}
                        PostOrder Traversal
                    {/* </h3> */}
                 </div>
                <div>
                    {/* <h3>  */}
                        LevelOrder Traversal
                    {/* </h3> */}
                 </div>
            </div>
            <div className="right">
                <div>{states.root.preOrder(true).map((key) => {
                    return <button key={keyCounter++}>{key}  </button>
                })}</div>
                <div>{states.root.inOrder(true).map((key) => {
                    return <button key={keyCounter++}>{key}  </button>
                })}</div>
                <div>{states.root.postOrder(true).map((key) => {
                    return <button key={keyCounter++}>{key}  </button>
                })}</div>
                <div>{states.root.levelOrder(true).map((key) => {
                    return <button key={keyCounter++}>{key}  </button>
                })}</div>
            </div>
        </div>
    )
}
