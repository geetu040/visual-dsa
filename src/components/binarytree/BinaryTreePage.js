import React, {useState} from 'react'
import Node from '../../scripts/binarytree/main';
import { Main } from './Main';
import "../../css/binarytree/BinaryTreePage.css"

export const BinaryTreePage = () => {

	// STATES
	const [selected, setSelected] = useState(0);
	const [undoStack, setUndoStack] = useState([]);
	const [redoStack, setRedoStack] = useState([]);
	const [treeType, setTreeType] = useState(0)
	
	const ran = ()=>{return Math.floor(Math.random()*100)}
	const [root, setRoot] = useState(
		new Node(
			ran(),
			new Node(ran(), new Node(ran()), new Node(ran())),
			new Node(ran(), new Node(ran()), new Node(ran())),
		)
	);
	
	// FUNCTIONS
	function updateRoot() {
		setRoot(root.copy());
	}
    const updateStacks = () => {
		setUndoStack( undoStack.concat([[root.copy(), treeType]]) )
		// setUndoStack( undoStack.concat([root.copy()]) )
		setRedoStack([])
    }

	// PROP OBJECTS
	let width = 95;
	let windowWidth = window.innerWidth
	if (windowWidth > 600)  /* Small devices (portrait tablets and large phones, 600px and up) */
		width = 85;
	if (windowWidth > 768)  /* Medium devices (landscape tablets, 768px and up) */
		width = 80;
	if (windowWidth > 992)  /* Large devices (laptops/desktops, 992px and up) */
		width = 70;	
	if (windowWidth > 1200) /* Extra large devices (large laptops and desktops, 1200px and up) */
		width = 65;

	const constants = {
		width: width,
		levels2D: root.getTrueLevels2D(),
		levels: root.getTrueLevels(),
		rightWidth: 16,
	}
	const states = {
		selected,
		setSelected,
		root,
		setRoot,
		updateRoot,
		undoStack,
		setUndoStack,
		redoStack,
		setRedoStack,
		treeType,
		setTreeType,
		updateStacks,
	}

	return (
		<Main states={states} constants={constants} />
	)
}