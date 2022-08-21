import React from 'react'
import Node from "../../scripts/binarytree/main"

import "../../css/binarytree/Right.css"


export const Right = ({states, constants}) => {

    let {root, updateRoot, undoStack, redoStack, setUndoStack,
        setRedoStack, selected, setSelected, setRoot, treeType, setTreeType, updateStacks} = states;

    
    let selectedNode = constants.levels[selected];

    const getInputKey = () => {
        let value = document.querySelector(".bt-key-input").value
        value = value.replace(/\s/g, '')
        value = parseInt(value)
        if (!isNaN(value)){
            document.querySelector(".bt-key-input").value = value;
            return value;
        } else {
            return null;
        }
    }

    const insert = () => {  // dependent of key, independent of selected
        let key = getInputKey();
        if (key != null) {
            updateStacks();   // undo redo operation
            root.insert(key, treeType);
            updateRoot();
        }
    }
    const search = () => {  // dependent of key, independent of selected
        let key = getInputKey();
        if (key != null) {
            let found = root.search(key, treeType);
            if (found != null) {
                let i = constants.levels.indexOf(found)
                setSelected(i);
            } else {
                setSelected(0);
            }
        }
    }
    const deleteNode = () => {  // independent of key, dependent of selected
        if (root.l === null && root.r === null) return;
        updateStacks();   // undo redo operation
        selectedNode.deleteNode(root, treeType);
        updateRoot();
        setSelected(0);
    }
    const undo = () => {
        // setRedoStack( redoStack.concat([root.copy()]) )
        // setRoot( undoStack.pop() );

        setRedoStack( redoStack.concat([[root.copy(), treeType]]) )
        let undo_stack = undoStack.pop();
        setRoot( undo_stack[0] )
        setTreeType( undo_stack[1] )
    }
    const redo = () => {
        // setUndoStack( undoStack.concat([root.copy()]) )
        // setRoot( redoStack.pop() );

        setUndoStack( undoStack.concat([[root.copy(), treeType]]) )
        let redo_stack = redoStack.pop();
        setRoot( redo_stack[0] )
        setTreeType( redo_stack[1] )
    }
    const rotateRight = () => {  // independent of key, dependent of selected
        updateStacks();   // undo redo operation

        let isRoot = false;
        if (selectedNode === root) isRoot = true;
        
        selectedNode = selectedNode.rotateRight(root);
        
        if (isRoot) {
            root.key = selectedNode.key;
            root.l = selectedNode.l;
            root.r = selectedNode.r;
        }

        updateRoot();
        setTreeType(0);
    }
    const rotateLeft = () => {  // independent of key, dependent of selected
        updateStacks();   // undo redo operation

        let isRoot = false;
        if (selectedNode === root) isRoot = true;
        
        selectedNode = selectedNode.rotateLeft(root);
        
        if (isRoot) {
            root.key = selectedNode.key;
            root.l = selectedNode.l;
            root.r = selectedNode.r;
        }

        updateRoot();
        setTreeType(0);
    }
    const addLeft = () => {  // dependent of key, dependent of selected
        let key = getInputKey();
        if (key != null) {
            updateStacks();   // undo redo operation
            selectedNode.l = new Node(key);
            updateRoot();
            setTreeType(0);
            
        }
    }
    const addRight = () => {  // dependent of key, dependent of selected
        let key = getInputKey();
        if (key != null) {
            updateStacks();   // undo redo operation
            selectedNode.r = new Node(key);
            updateRoot();
            setTreeType(0);
            
        }
    }
    const editKey = () => {  // dependent of key, dependent of selected
        let key = getInputKey();
        if (key != null) {
            updateStacks();   // undo redo operation
            selectedNode.key = key;
            updateRoot();
            setTreeType(0);
            
        }
    }
    return (
        <div className='bt-right' style={{width: constants.rightWidth + "%"}}>
            <input type="text" placeholder='Key' className='bt-key-input' />
            <button onClick={()=>{insert()}}>Insert</button>
            <button onClick={()=>{search()}}>Search</button>
            <button onClick={()=>{addLeft()}} disabled={(selectedNode.l!=null)}>Add Left</button>
            <button onClick={()=>{addRight()}} disabled={(selectedNode.r!=null)}>Add Right</button>
            <button onClick={()=>{editKey()}}>Edit Key</button>
            <div style={{
                width: "100%",
                backgroundColor: "var(--bt-purple)",
                height: "0.1vw",
            }}></div>
            <button onClick={()=>{undo()}} disabled={undoStack.length === 0}>Undo</button>
            <button onClick={()=>{redo()}} disabled={redoStack.length === 0}>Redo</button>
            <div style={{
                width: "100%",
                backgroundColor: "var(--bt-purple)",
                height: "0.1vw",
            }}></div>
            <button onClick={()=>{deleteNode()}}>Delete</button>
            <button onClick={()=>{rotateRight()}} disabled={(selectedNode.l==null)}>Rotate Right</button>
            <button onClick={()=>{rotateLeft()}} disabled={(selectedNode.r==null)}>Rotate Left</button>
        </div>
    )
}
