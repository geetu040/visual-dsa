import React from 'react'
import "../../css/binarytree/Header.css"

export const Header = ({states}) => {
    let {treeType, setTreeType, root, setRoot, setSelected, updateStacks} = states;

    const changeTree = (treeNo) => {
        updateStacks();
        document.title = `Binary Trees - ${['Heap | BST | AVL', 'Min Heap', 'Max Heap', 'BST', 'AVL'][treeNo]} - DSA`

		root.createTree(treeNo)
		setRoot(root.copy());
		setSelected(0);
        setTreeType(treeNo);
    }

    return (
        <div className='bt-header'>
            <button onClick={()=>{changeTree(0)}} className={`${(treeType===0)?"seleted":""}`} > <h4> Binary Tree </h4></button>
            <button onClick={()=>{changeTree(1)}} className={`${(treeType===1)?"seleted":""}`} > <h4> Heap Min </h4></button>
            <button onClick={()=>{changeTree(2)}} className={`${(treeType===2)?"seleted":""}`} > <h4> Heap Max </h4></button>
            <button onClick={()=>{changeTree(3)}} className={`${(treeType===3)?"seleted":""}`} > <h4> BST </h4></button>
            <button onClick={()=>{changeTree(4)}} className={`${(treeType===4)?"seleted":""}`} > <h4> AVL </h4></button>
        </div>
    )
}
